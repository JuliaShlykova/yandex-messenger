import './style.scss';
import RouterManagement from './modules/routing/RouterManagement';

document.addEventListener('DOMContentLoaded', () => {
  RouterManagement
      .start();
});
