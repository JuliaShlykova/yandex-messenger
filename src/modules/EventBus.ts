type PrimitiveType = string | number | boolean;

export type ObjectType = Record<string, (PrimitiveType | ((e: Event) => void))>;

export type PropType = Record<string, PrimitiveType | ObjectType | (() => void)>;

export function isObject( propValue: PrimitiveType | ObjectType | (() => void)):
 propValue is ObjectType {
  return typeof propValue === 'object';
}

export type EventCallback = (...args: PropType[]) => void;

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

  emit(event: string, ...args: PropType[]): void {
    // console.log(event, args);
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}
