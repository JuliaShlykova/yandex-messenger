import store from '../modules/store/store';
import { getUser } from './auth';
import { getChats } from './chat';

export const setState = async () => {
  try {
    const user = await getUser();
    store.set('user', user);
    const chats = await getChats();
    store.set('chats', chats);
  } catch (err) {
    console.log(err);
  }
};
