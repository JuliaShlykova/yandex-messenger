import HTTP from '../modules/http/httpTransport';
import { BaseAPI } from '../modules/http/base-api';

const chatMessagesAPIInstance = new HTTP('api/v1/messages');

class ChatMessagesAPI extends BaseAPI {
  request(id?: string) {
    if (id) {
      return chatMessagesAPIInstance.get(`/${id}`);
    } else {
      throw new Error('No id specified');
    }
  }
}

export default ChatMessagesAPI;
