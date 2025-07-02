export type PropValue = string|number|object;
export type EventCallback = (...args: PropValue[]) => void;

export default class EventBus {
  private listeners: Record<string, EventCallback[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: EventCallback): void {
    // console.log(event, callback);

    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventCallback): void {
    // console.log(event, callback);
    if (!this.listeners[event]) {
      throw new Error(`No event ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
        listener => listener !== callback
    );
  }

  emit(event: string, ...args: PropValue[]): void {
    // console.log(event, args);
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}
