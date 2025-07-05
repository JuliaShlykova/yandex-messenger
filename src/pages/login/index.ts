import template from './login.hbs?raw';
import Block from '../../modules/Block';
import Button from '../../components/button';
import Input from '../../components/input';
import submit from '../../utils/submit';

class LoginPage extends Block {
  constructor() {
    super({
      inputLogin: new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        id: 'login',
        settings: { withInternalId: true },
        required: true
      }),
      inputPassword: new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        id: 'password',
        settings: { withInternalId: true },
        required: true
      }),
      button: new Button({
        type: 'submit',
        text: 'Войти',
        events: {
          click: event => {
            event.preventDefault();
            submit('#form-login');
          }
        }
      })
    });
  }

  render() {
    return template;
  }
}

export { LoginPage as Login };
