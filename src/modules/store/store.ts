import EventBus from '../EventBus';
import set from './utils/set';

export type Indexed<T = unknown> = {
  [key: string]: T;
};

export const StoreEvents = {
  Updated: 'updated'
};

class Store extends EventBus {
  private state: Indexed = {};

  constructor() {
    super();
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    try {
      this.state = set(this.state, path, value) as Indexed;
    } catch (err) {
      console.log(err);
    }

    // метод EventBus
    this.emit(StoreEvents.Updated);
  };

  public clear() {
    this.state = {};
  }
}

export default new Store();
