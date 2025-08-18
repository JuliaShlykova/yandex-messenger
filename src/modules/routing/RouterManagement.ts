import Router from './Router';
import * as Pages from '../../pages';

const RouterManagement = new Router();

RouterManagement
    .use('/', Pages.Login)
    .use('/sign-in', Pages.Login)
    .use('/sign-up', Pages.Signup)
    .use('/settings', Pages.Profile)
    .use('/messenger', Pages.Chat)
    .use('/not-found', Pages.NotFound)
    .use('/server-error', Pages.ServerError)
    .use('/change-password', Pages.ChangePassword);

export default RouterManagement;
