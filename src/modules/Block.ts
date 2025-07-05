import EventBus from './EventBus';
import { PropType, isObject } from './types';
import Handlebars from 'handlebars';
import makeUUID from '../utils/makeUUID';

type ChildType = Record<string, Block>;

export type BlockProps = PropType | ChildType;

abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  protected _id: string | null = null;

  protected _element: HTMLElement | null = null;

  protected props: PropType;

  protected _oldProps: PropType;

  protected children: ChildType;

  protected eventBus: () => EventBus;

  constructor(propsAndChildren: BlockProps = {}) {
    const eventBus = new EventBus();

    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;

    if (isObject(props.settings)&&props.settings.withInternalId) {
      this._id = makeUUID();
      this.props = this._makePropsProxy({ ...props, __id: this._id });
    } else {
      this.props = this._makePropsProxy(props);
    }

    this._oldProps = {};

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
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

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
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

  private _makePropsProxy(props: PropType): PropType {
    const that = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };
        target[prop] = value;
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
    const { events } = this.props as {events: Record<string, () => void>};
    if (events) {
      Object.keys(events).forEach((eventName: string) => {
        this._element?.addEventListener(eventName, events[eventName]);
      });
    }
  }

  private _removeEvents() {
    const { events = {} } = this._oldProps as {events: Record<string, () => void>};

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private _getChildren(propsAndChildren: BlockProps): {
    children: ChildType,
    props: PropType
  } {
    const children: ChildType = {};
    const props: PropType = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }
}

export default Block;
