import HTTPTransport from '../modules/network/httpTransport';
import { FormChangePassword, FormProfile, UserResponse } from './types';

class UserAPI {
  private readonly userAPIInstance = new HTTPTransport('/user');

  updateProfile(data: FormProfile) {
    return this.userAPIInstance.put<UserResponse>('/profile', { data });
  }

  updateAvatar(data: FormData) {
    return this.userAPIInstance.put<UserResponse>('/profile/avatar', { data });
  }

  changePassword(data: FormChangePassword) {
    return this.userAPIInstance.put<void>('/password', { data });
  }

  searchUserByLogin(data: {login: string}) {
    return this.userAPIInstance.post<UserResponse[]>('/search', { data });
  }
}

export default UserAPI;
