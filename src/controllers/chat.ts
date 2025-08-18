import ChatAPI from '../api/chat-api';
import { FormChatCreate, isHTTPError } from '../api/types';
import store from '../modules/store/store';
import { findUserByLogin } from './user';

const chatAPI = new ChatAPI();

export const getChats = async () => {
  try {
    const chats = await chatAPI.getChats();
    return chats;
  } catch (err) {
    throw err;
  }
};

export const createChat = async (data: FormChatCreate) => {
  try {
    const { id } = await chatAPI.createChat(data);
    const chats = await getChats();
    store.set('chats', chats);
    store.set('currentChat', id);
  } catch (err) {
    if (isHTTPError(err)) {
      throw new Error(err.reason);
    } else {
      throw err;
    }
  }
};

export const deleteChat = async (chatId: number) => {
  try {
    await chatAPI.deleteChat({ chatId });
    const chats = await getChats();
    store.set('chats', chats);
  } catch (err) {
    throw err;
  }
};

export const addUser = async (userLogin: string, chatId: number) => {
  try {
    const userId = await findUserByLogin(userLogin);
    await chatAPI.addUserToChat({ users: [userId], chatId });
  } catch (err) {
    if (isHTTPError(err)) {
      throw new Error(err.reason);
    } else {
      throw err;
    }
  }
};

export const removeUser = async (userLogin: string, chatId: number) => {
  try {
    const userId = await findUserByLogin(userLogin);
    await chatAPI.removeUserFromChat({ users: [userId], chatId });
  } catch (err) {
    if (isHTTPError(err)) {
      throw new Error(err.reason);
    } else {
      throw err;
    }
  }
};

export const getChatToken = async (chatId: number) => {
  try {
    const { token } = await chatAPI.getChatTokenById(chatId);
    return token;
  } catch (err) {
    throw err;
  }
};
