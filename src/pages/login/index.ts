import template from './login.hbs?raw';
import Block from '../../modules/Block';
import Button from '../../components/button';
import Input from '../../components/input';
import shapedData from '../../utils/shapeData';
import RouterManagement from '../../modules/routing/RouterManagement';
import { signin } from '../../controllers/auth';
import { FormSignIn } from '../../api/types';
import FormError from '../../components/form-error';

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
      formError: new FormError(),
      button: new Button({
        type: 'submit',
        text: 'Войти',
        events: {
          click: event => {
            event.preventDefault();
            const data = shapedData('#form-login');
            if (data) {
              signin(data as FormSignIn).catch(error => {
                console.log('error occurred: ', error);
                this.children.formError.setProps({ error: error });
              });
            }
          }
        }
      }),
      buttonLink: new Button({
        text: 'Создать аккаунт',
        class: 'btn-link',
        events: {
          click: () => {
            RouterManagement.go('/sign-up');
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
