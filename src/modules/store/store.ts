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
      console.log('updated state: ', this.state);
      this.emit(StoreEvents.Updated);
    } catch (err) {
      console.log(err);
    }
  };

  public clear() {
    this.state = {};
  }
}

export default new Store();
