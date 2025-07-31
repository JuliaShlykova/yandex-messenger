import template from './signup.hbs?raw';
import Block from '../../modules/Block';
import Button from '../../components/button';
import Input from '../../components/input';
import submit from '../../utils/submit';
import RouterManagement from '../../modules/routing/RouterManagement';

class SignupPage extends Block {
  constructor() {
    super({
      inputFirstName: new Input({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        id: 'first-name',
        settings: { withInternalId: true },
        required: true
      }),
      inputLastName: new Input({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        id: 'second-name',
        settings: { withInternalId: true },
        required: true
      }),
      inputLogin: new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        id: 'login',
        settings: { withInternalId: true },
        required: true
      }),
      inputEmail: new Input({
        type: 'email',
        name: 'email',
        label: 'Почта',
        id: 'email',
        settings: { withInternalId: true },
        required: true
      }),
      inputPhone: new Input({
        type: 'tel',
        name: 'email',
        label: 'Телефон',
        id: 'phone',
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
      inputConfirmPassword: new Input({
        type: 'password',
        label: 'Повторите пароль',
        id: 'confirm-password',
        settings: { withInternalId: true },
        required: true
      }),
      button: new Button({
        type: 'submit',
        text: 'Зарегистрироваться',
        events: {
          click: event => {
            event.preventDefault();
            submit('#form-signup');
          }
        }
      }),
      buttonLink: new Button({
        text: 'Уже есть аккаунт',
        class: 'btn-link',
        events: {
          click: () => {
            RouterManagement.go('/sign-in');
          }
        }
      })
    });
  }

  render() {
    return template;
  }
}

export { SignupPage as Signup };
