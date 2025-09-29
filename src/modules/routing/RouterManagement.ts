import Router from './Router';
import * as Pages from '../../pages';
import { ROUTES } from './Constants';

const RouterManagement = new Router();

RouterManagement
    .use(ROUTES.SignIn, Pages.Login)
    .use(ROUTES.SignUp, Pages.Signup)
    .use(ROUTES.Settings, Pages.Profile)
    .use(ROUTES.Messenger, Pages.Chat)
    .use(ROUTES.Error404, Pages.NotFound)
    .use(ROUTES.Error500, Pages.ServerError)
    .use(ROUTES.ChangePassword, Pages.ChangePassword);

export default RouterManagement;
