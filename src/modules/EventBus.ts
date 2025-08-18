type EventCallback<T extends unknown = unknown> = (...args: T[]) => void;

export default class EventBus<P extends unknown = unknown> {
  private listeners: Record<string, EventCallback<P>[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: EventCallback<P>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventCallback<P>): void {
    if (!this.listeners[event]) {
      throw new Error(`No event ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
        listener => listener !== callback
    );
  }

  emit(event: string, ...args: P[]): void {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}
