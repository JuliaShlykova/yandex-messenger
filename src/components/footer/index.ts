import './footer.scss';
import template from './footer.hbs?raw';
import Block from '../../modules/Block';
import Button from '../button';
import applyPage from '../../utils/applyPage';
import * as Pages from '../../pages';

class Footer extends Block {
  constructor() {
    super({
      buttonLogin: new Button({
        text: 'Авторизация',
        events: {
          click: () => {
            const block = new Pages.Login();
            applyPage<Pages.Login>(block);
          }
        }
      }),
      buttonSignup: new Button({
        text: 'Регистрация',
        events: {
          click: () => {
            const block = new Pages.Signup();
            applyPage<Pages.Signup>(block);
          }
        }
      }),
      buttonChat: new Button({
        text: 'Чат',
        events: {
          click: () => {
            const block = new Pages.Chat();
            applyPage<Pages.Chat>(block);
          }
        }
      }),
      buttonProfile: new Button({
        text: 'Профиль',
        events: {
          click: () => {
            const block = new Pages.Profile();
            applyPage<Pages.Profile>(block);
          }
        }
      }),
      button404: new Button({
        text: '404',
        events: {
          click: () => {
            const block = new Pages.NotFound();
            applyPage<Pages.NotFound>(block);
          }
        }
      }),
      button500: new Button({
        text: '500',
        events: {
          click: () => {
            const block = new Pages.ServerError();
            applyPage<Pages.ServerError>(block);
          }
        }
      })
    });
  }

  render() {
    return template;
  }
}

export default Footer;
