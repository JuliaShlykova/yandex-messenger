import AuthAPI from '../api/auth-api';
import { FormSignIn, FormSignUp, isHTTPError } from '../api/types';
import RouterManagement from '../modules/routing/RouterManagement';
import store from '../modules/store/store';

const authAPI = new AuthAPI();

export const signup = async (data: FormSignUp) => {
  try {
    await authAPI.signup(data);
    await setUser();
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
    await setUser();
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
    store.clear();
    RouterManagement.go('/sign-in');
  } catch (err) {
    console.log(err);
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

export const setUser = async () => {
  try {
    const user = await getUser();
    store.set('user', user);
  } catch (err) {
    console.log(err);
  }
};
