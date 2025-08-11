import HTTPTransport from '../modules/http/httpTransport';
import { FormChangePassword, FormProfile, UserResponse } from './types';

const userAPIInstance = new HTTPTransport('/user');

class UserAPI {
  updateProfile(data: FormProfile) {
    return userAPIInstance.put<UserResponse>('/profile', { data });
  }

  updateAvatar(data: FormData) {
    return userAPIInstance.put<UserResponse>('/profile/avatar', { data });
  }

  changePassword(data: FormChangePassword) {
    return userAPIInstance.put<void>('/password', { data });
  }

  searchUserByLogin(data: {login: string}) {
    return userAPIInstance.post<UserResponse[]>('/search', { data });
  }
}

export default UserAPI;
