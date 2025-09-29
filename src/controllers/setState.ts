import store from '../modules/store/store';
import { getUser } from './checkUser';
import { getChats, getChatUsers } from './chat';

export const setState = async () => {
  try {
    const [user, chats] = await Promise.all([getUser(), getChats()]);
    store.set('user', user);
    store.set('chats', chats);
  } catch (err) {
    console.log(err);
  }
};

export const setParticipants = async () => {
  try {
    const curChat = store.getState().currentChat;
    if (curChat) {
      const participants = await getChatUsers(curChat);
      store.set('participants', participants);
    } else {
      throw new Error('no current chat!');
    }
  } catch (err) {
    console.log(err);
  }
};
