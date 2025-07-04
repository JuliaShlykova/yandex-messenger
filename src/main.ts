import './style.scss';
// import Handlebars from 'handlebars';
import * as Pages from './pages';
import setFooter from './modules/setFooter';
import applyPage from './utils/applyPage';

setFooter();

const login = new Pages.Chat();
applyPage<Pages.Chat>(login);
