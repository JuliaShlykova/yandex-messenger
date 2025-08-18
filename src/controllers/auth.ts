import AuthAPI from '../api/auth-api';
import { FormSignIn, FormSignUp, isHTTPError } from '../api/types';
import RouterManagement from '../modules/routing/RouterManagement';
import store from '../modules/store/store';
import { setState } from './setState';

const authAPI = new AuthAPI();

export const signup = async (data: FormSignUp) => {
  try {
    await authAPI.signup(data);
    await setState();
    RouterManagement.go('/messenger');
  } catch (err) {
    if (isHTTPError(err)) {
      throw new Error(err.reason);
    } else {
      console.log(err);
    }
  }
};

export const signin = async (data: FormSignIn) => {
  try {
    await authAPI.signin(data);
    await setState();
    RouterManagement.go('/messenger');
  } catch (err) {
    if (isHTTPError(err)) {
      throw new Error(err.reason);
    } else {
      console.log(err);
    }
  }
};

export const logout = async () => {
  try {
    await authAPI.logout();
  } catch (err) {
    console.log(err);
  } finally {
    store.clear();
    RouterManagement.go('/sign-in');
  }
};

export const getUser = async () => {
  try {
    const user = await authAPI.getUser();
    return user;
  } catch (err) {
    throw err;
  }
};

export const isAuth = async () => {
  try {
    await getUser();
    return true;
  } catch {
    return false;
  }
};
