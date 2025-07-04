import './login.scss';
import template from './login.hbs?raw';
import Block from '../../modules/Block';
// import { PropType } from '../../modules/EventBus';
import Button from '../../components/button';
import Input from '../../components/input';

class LoginPage extends Block {
  constructor() {
    super({
      inputLogin: new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        id: 'login',
        required: true
      }),
      inputPassword: new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        id: 'password',
        required: true
      }),
      button: new Button({
        type: 'submit',
        text: 'Войти'
      })
    });
  }

  render() {
    return template;
  }
}

export { LoginPage as Login };
