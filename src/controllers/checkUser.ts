import AuthAPI from '../api/auth-api';

const authAPI = new AuthAPI();

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
