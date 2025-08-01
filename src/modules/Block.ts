import EventBus from './EventBus';
// import { PropType, isObject } from './types';
import Handlebars from 'handlebars';
import makeUUID from '../utils/makeUUID';
import isObjectEqual from '../utils/isObjectEqual';

// type ChildType = Record<string, Block>;
interface ChildType {
  [key: string]: Block
}
// export type BlockProps = PropType | ChildType;

interface SettingsType {
  withInternalId?: Boolean
}

interface EventsCallbackTypes {
  [key: string]: (e: Event) => void
} 
export interface BlockProps {
  events?: EventsCallbackTypes,
  settings?: SettingsType,
  [key: string]: ChildType | unknown
};

abstract class Block<T = Record<string, unknown>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  protected _id: string | null = null;

  protected _element: HTMLElement | null = null;

  protected props: T & BlockProps;

  protected _oldProps: T & BlockProps;

  protected children: ChildType;

  protected eventBus: () => EventBus<T & BlockProps>;

  constructor(propsAndChildren: T & BlockProps = {} as T & BlockProps) {
    const eventBus = new EventBus<T & BlockProps>();

    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;

    if (props.settings?.withInternalId) {
      this._id = makeUUID();
      this.props = this._makePropsProxy({ ...props, __id: this._id });
    } else {
      this.props = this._makePropsProxy(props);
    }

    this._oldProps = {} as T & BlockProps;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus<T & BlockProps>): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: T & BlockProps, newProps: T & BlockProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidUpdate(oldProps: T & BlockProps, newProps: T & BlockProps): boolean {
    return isObjectEqual(oldProps, newProps);
  }

  public setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return;
    }

    this._oldProps = { ...this.props };
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _compile(template: string, props: BlockProps): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);


    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub?.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  private _render(): void {
    const block = this._compile(this.render(), this.props);

    const newElement = block.firstElementChild as HTMLElement;

    // remove old event listeners
    this._removeEvents();

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  protected render(): string {
    return '';
  }

  public getContent(): HTMLElement {
    if (!this.element) {
      throw new Error('Element is not created');
    }
    return this.element;
  }

  private _makePropsProxy(props: T & BlockProps): T & BlockProps {
    const that = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };
        target[prop as keyof T & BlockProps] = value;
        that.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Access denied');
      }
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    if (this._id) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  public show(): void {
    this.getContent().style.display = 'block';
  }

  public hide(): void {
    this.getContent().style.display = 'none';
  }

  private _addEvents(): void {
    const { events } = this.props;
    if (events) {
      Object.keys(events).forEach((eventName: string) => {
        this._element?.addEventListener(eventName, events[eventName]);
      });
    }
  }

  private _removeEvents() {
    const { events = {} } = this._oldProps;

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private _getChildren(propsAndChildren: T & BlockProps): {
    children: ChildType,
    props: T & BlockProps
  } {
    const children: ChildType = {};
    const props: T & BlockProps = {} as T & BlockProps;

    (Object.keys(propsAndChildren) as (keyof T & BlockProps)[]).forEach(key => {
      let value = propsAndChildren[key];
      if (value instanceof Block) {
        children[key as keyof ChildType] = value;
      } else {
        props[key] = value;
      }
    })

    return { children, props };
  }
}

export default Block;
