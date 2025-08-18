
import { FormChangePassword, FormProfile, isHTTPError } from '../api/types';
import UserAPI from '../api/user-api';
import store from '../modules/store/store';

const userApi = new UserAPI();

export const updateProfile = async (data: FormProfile) => {
  try {
    const updatedUser = await userApi.updateProfile(data);
    store.set('user', updatedUser);
  } catch (err) {
    if (isHTTPError(err)) {
      throw new Error(err.reason);
    } else {
      console.log(err);
    }
  }
};

export const updateAvatar = async (file: File) => {
  try {
    const data = new FormData();
    data.append('avatar', file);
    const updatedUser = await userApi.updateAvatar(data);
    store.set('user', updatedUser);
  } catch (err) {
    if (isHTTPError(err)) {
      throw new Error(err.reason);
    } else {
      console.log(err);
    }
  }
};

export const updatePassword = async (data: FormChangePassword) => {
  try {
    await userApi.changePassword(data);
  } catch (err) {
    if (isHTTPError(err)) {
      throw new Error(err.reason);
    } else {
      console.log(err);
    }
  }
};

export const findUserByLogin = async (login: string) => {
  try {
    const users = await userApi.searchUserByLogin({ login });
    if (users.length === 0) {
      throw new Error('Таких пользователей нет');
    }
    return users[0].id;
  } catch (err) {
    throw err;
  }
};
