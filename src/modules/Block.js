// import EventBus, { EventCallback, PropValue } from "./EventBus";
import EventBus from "./EventBus";
import Handlebars from "handlebars";
import makeUUID from "../utils/makeUUID";

// type BlockProps = Record<string, PropValue>;

// Нельзя создавать экземпляр данного класса
class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _id = null;

  _element = null;
  _meta = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", propsAndChildren = {}) {
    const eventBus = new EventBus();

    const {children, props} = this._getChildren(propsAndChildren);
    this.children = children;

    this._meta = {
      tagName,
      props
    };
    
    if (props.settings?.withInternalId) {
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

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    })
  }

  componentDidMount(oldProps) {}

  dispatchComponentDidMount() {
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps, newProps) {
    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    this._oldProps = {...this.props};
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _compile(template, props) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub.replaceWith(child.getContent());
    })

    return fragment.content;
  }

  _render() {
    const block = this._compile(this.render(), this.props);

    // remove old event listeners
    this._removeEvents();

    this._element.innerHTML = '';

    // this._element = block.firstElementChild;
    this._element.appendChild(block);
    // add all event listeners
    this._addEvents();
  }

    // Переопределяется пользователем. Необходимо вернуть разметку
  render() {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const that = this;
    
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = {...target};
        target[prop] = value;
        that.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Access denied");
      }
    })
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);
    if (this._id) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }

  _addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const {events = {}} = this._oldProps;
    
    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _getChildren(propsAndChildren) {
    const children = {};
    const props = {};

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
