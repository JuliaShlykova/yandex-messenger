
// import UserAPI from '../api/user-api';

// const userApi = new UserAPI();

class UserController {
  updateAvatar(file: File) {
    const data = new FormData();
    data.append('avatar', file);
    // return userApi.update(data);
  }
}

export default UserController;
