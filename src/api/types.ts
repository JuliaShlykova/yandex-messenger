import { PlainObject } from '../modules/types';

export type HTTPError = {
  reason: string;
  status: string;
}

export function isHTTPError(error: unknown): error is HTTPError {
  return ('reason' in (error as PlainObject)) && ('status' in (error as PlainObject));
}

export type APIResponse<T> = HTTPError | T;

export type FormSignIn = {
  login: string,
  password: string
}

export type FormSignUp = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export type UserResponse = {
  id: number;
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  display_name: string,
  avatar: string,
  phone: string
}

export type SignUpResponse = {
  id: number
}

export type FormProfile = Omit<UserResponse, 'id' | 'avatar' | 'display_name'>;

export type FormChangePassword = {
  oldPassword: string,
  newPassword: string
}

export type ChatInfo = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message: {
    user: Omit<UserResponse, 'id' | 'display_name'>,
    time: string,
    content: string
  }
}

export type ChatsResponse = ChatInfo[];

export type FormChatCreate = {
  title: string
}

export type ChatCreateResponse = {
  id: number
}

export type ChatDeleteResponse = {
  userId: number,
  result: {
    id: number,
    title: string,
    avatar: number,
    created_by: number
  }
}

export type ChatActionWithUsers = {users: number[], chatId: number};

export type ChatTokenResponse = {
    token: string
}

export type ChatUser = Omit<UserResponse, 'email' | 'phone'>;

export type ChatUsersResponse = ChatUser[];
