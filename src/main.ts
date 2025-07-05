import './style.scss';
import * as Pages from './pages';
import setFooter from './modules/setFooter';
import applyPage from './utils/applyPage';

setFooter();

const login = new Pages.Login();
applyPage<Pages.Login>(login);
