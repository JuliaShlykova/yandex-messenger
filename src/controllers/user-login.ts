import LoginAPI from '../api/login-api';
import RouterManagement from '../modules/routing/RouterManagement';
import { LoginFormModel } from '../modules/types';

const loginApi = new LoginAPI();
const userLoginValidator = validateLoginFields(validateRules);

class UserLoginController {
  @validate(userLoginValidateRules)
  @handleError(handler)
  public async login(data: LoginFormModel) {
    const userID = loginApi.request(prepareDataToRequest(data));
    RouterManagement.go('/chats');
  }
}
