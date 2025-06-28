import './style.scss';
import Handlebars from 'handlebars';
import * as Pages from './pages';
import setFooter from './modules/setFooter';
import applyPage from './utils/applyPage';

import Button from './components/button';
import Input from './components/input';
import CenteringWrapper from './components/centering-wrapper';


Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('CenteringWrapper', CenteringWrapper);


setFooter();
applyPage(Pages.Login);

const btnLogin = document.querySelector('#btn-login');
const btnSignup = document.querySelector('#btn-signup');
const btnChat = document.querySelector('#btn-chat');
const btnProfile = document.querySelector('#btn-profile');
const btn404 = document.querySelector('#btn-404');
const btn500 = document.querySelector('#btn-500');

btnLogin?.addEventListener('click', () => applyPage(Pages.Login));
btnSignup?.addEventListener('click', () => applyPage(Pages.Signup));
btnChat?.addEventListener('click', () => applyPage(Pages.Chat));
btnProfile?.addEventListener('click', () => applyPage(Pages.Profile));
btn404?.addEventListener('click', () => applyPage(Pages.NotFound));
btn500?.addEventListener('click', () => applyPage(Pages.ServerError));
