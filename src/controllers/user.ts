import LoginAPI from '../api/login-api';
import UserAPI from '../api/user-api';
import RouterManagement from '../modules/routing/RouterManagement';
import { LoginFormModel } from '../modules/types';

const userApi = new UserAPI();

class UserController {
  updateAvatar(file: File) {
    const data = new FormData();
    data.append('avatar', file);
    return userApi.update(data);
  }
}

export default UserController;
