import HTTPTransport from '../modules/network/httpTransport';
import { FormSignIn, FormSignUp, SignUpResponse, UserResponse } from './types';

class AuthAPI {
  private readonly authAPIInstance = new HTTPTransport('/auth');

  signup(data: FormSignUp) {
    return this.authAPIInstance.post<SignUpResponse>('/signup', { data });
  }
  signin(data: FormSignIn) {
    return this.authAPIInstance.post<void>('/signin', { data });
  }
  logout() {
    return this.authAPIInstance.post<void>('/logout');
  }
  getUser() {
    return this.authAPIInstance.get<UserResponse>('/user');
  }
}

export default AuthAPI;
