import HTTPTransport from '../modules/http/httpTransport';
import {
  ChatActionWithUsers,
  ChatCreateResponse,
  ChatDeleteResponse,
  ChatsResponse,
  ChatTokenResponse,
  FormChatCreate
} from './types';

const chatAPIInstance = new HTTPTransport('/chats');

class ChatAPI {
  getChats() {
    return chatAPIInstance.get<ChatsResponse>('');
  }

  createChat(data: FormChatCreate) {
    return chatAPIInstance.post<ChatCreateResponse>('', { data });
  }

  deleteChat(data: {chatId: number}) {
    return chatAPIInstance.delete<ChatDeleteResponse>('', { data });
  }

  addUserToChat(data: ChatActionWithUsers) {
    return chatAPIInstance.put<void>('/users', { data });
  }

  removeUserFromChat(data: ChatActionWithUsers) {
    return chatAPIInstance.delete<void>('/users', { data });
  }

  getChatTokenById(id: number) {
    return chatAPIInstance.post<ChatTokenResponse>('/token/' + id);
  }
}

export default ChatAPI;
