import HTTPTransport from '../modules/http/httpTransport';
import { FormSignIn, FormSignUp, SignUpResponse, UserResponse } from './types';

const authAPIInstance = new HTTPTransport('/auth');

class AuthAPI {
  signup(data: FormSignUp) {
    return authAPIInstance.post<SignUpResponse>('/signup', { data });
  }
  signin(data: FormSignIn) {
    return authAPIInstance.post<void>('/signin', { data });
  }
  logout() {
    return authAPIInstance.post<void>('/logout');
  }
  getUser() {
    return authAPIInstance.get<UserResponse>('/user');
  }
}

export default AuthAPI;
