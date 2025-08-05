import { BaseAPI } from '../modules/http/base-api';
import HTTPTransport from '../modules/http/httpTransport';

const userAPIInstance = new HTTPTransport('api/v1/chats');

class UserAPI extends BaseAPI {
  create() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return userAPIInstance.post('/', { data: { title: 'string' } });
  }

  request() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return userAPIInstance.get('/full');
  }

  update(data?: FormData) {
    return userAPIInstance.post('/', { data });
  }
}

export default UserAPI;
