import HTTPTransport from '../modules/network/httpTransport';
import {
  ChatActionWithUsers,
  ChatCreateResponse,
  ChatDeleteResponse,
  ChatsResponse,
  ChatTokenResponse,
  FormChatCreate
} from './types';

class ChatAPI {
  private readonly chatAPIInstance = new HTTPTransport('/chats');

  getChats() {
    return this.chatAPIInstance.get<ChatsResponse>('');
  }

  createChat(data: FormChatCreate) {
    return this.chatAPIInstance.post<ChatCreateResponse>('', { data });
  }

  deleteChat(data: {chatId: number}) {
    return this.chatAPIInstance.delete<ChatDeleteResponse>('', { data });
  }

  addUserToChat(data: ChatActionWithUsers) {
    return this.chatAPIInstance.put<void>('/users', { data });
  }

  removeUserFromChat(data: ChatActionWithUsers) {
    return this.chatAPIInstance.delete<void>('/users', { data });
  }

  getChatTokenById(id: number) {
    return this.chatAPIInstance.post<ChatTokenResponse>('/token/' + id);
  }
}

export default ChatAPI;
