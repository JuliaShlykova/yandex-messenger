import store from '../modules/store/store';
import { getUser } from './auth';
import { getChats } from './chat';

export const setState = async () => {
  try {
    const [user, chats] = await Promise.all([getUser(), getChats()]);
    store.set('user', user);
    store.set('chats', chats);
  } catch (err) {
    console.log(err);
  }
};
