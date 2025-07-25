import './style.scss';
import RouterManagement from './modules/routing/RouterManagement';

document.addEventListener('DOMContentLoaded', () => {
  // const router = new Router();

  // router
  RouterManagement
      .start();

  // router.go('/messenger');
});
