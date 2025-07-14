import './style.scss';
import * as Pages from './pages';
import Router from './modules/routing/Router';

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router();

  router
      .use('/', Pages.Login)
      .use('/sign-in', Pages.Login)
      .use('/sign-up', Pages.Signup)
      .use('/settings', Pages.Profile)
      .use('/messenger', Pages.Chat)
      .use('/not-found', Pages.NotFound)
      .use('/server-error', Pages.ServerError)
      .start();

  // router.go('/messenger');
});
