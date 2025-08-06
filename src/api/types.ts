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
  'confirm-pasword': string,
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
