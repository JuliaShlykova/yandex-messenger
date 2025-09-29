import { ChatsResponse, ChatUsersResponse, UserResponse } from '../../api/types';
import EventBus from '../EventBus';
import { MessageType } from '../network/messageService';
import set from './utils/set';

export type Indexed<T = unknown> = {
  [key: string]: T;
};

export const StoreEvents = {
  UPDATED: 'updated'
};

type BaseState = {
  chats?: ChatsResponse,
  currentChat?: number,
  messages?: MessageType[], // messages for current chat
  user?: UserResponse,
  participants?: ChatUsersResponse // participants for current chat
}

class Store extends EventBus {
  static STORE_NAME = 'appStore';
  private _state: BaseState = {};

  constructor() {
    super();
  }

  public getState() {
    return this._state;
  }

  public set(path: string, value: unknown) {
    try {
      this._state = set(this._state, path, value) as Indexed;
      this.emit(StoreEvents.UPDATED);
    } catch (err) {
      console.log(err);
    }
  };

  public clear() {
    this._state = {};
  }
}

export default new Store();
