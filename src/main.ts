import './style.scss';
import RouterManagement from './modules/routing/RouterManagement';

document.addEventListener('DOMContentLoaded', async () => {
  RouterManagement
      .start();
});
