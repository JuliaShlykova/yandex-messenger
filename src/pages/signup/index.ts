import template from './signup.hbs?raw';
import Block from '../../modules/Block';
import Button from '../../components/button';
import Input from '../../components/input';
import shapedData from '../../utils/shapeData';
import RouterManagement from '../../modules/routing/RouterManagement';
import { signup } from '../../controllers/auth';
import { FormSignUp } from '../../api/types';
import FormError from '../../components/form-error';

class SignupPage extends Block {
  constructor() {
    super({
      inputFirstName: new Input({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        id: 'first-name',
        required: true
      }),
      inputLastName: new Input({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        id: 'second-name',
        required: true
      }),
      inputLogin: new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        id: 'login',
        required: true
      }),
      inputEmail: new Input({
        type: 'email',
        name: 'email',
        label: 'Почта',
        id: 'email',
        required: true
      }),
      inputPhone: new Input({
        type: 'tel',
        name: 'phone',
        label: 'Телефон',
        id: 'phone',
        required: true
      }),
      inputPassword: new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        id: 'password',
        required: true
      }),
      inputConfirmPassword: new Input({
        type: 'password',
        label: 'Повторите пароль',
        name: 'confirm-password',
        id: 'confirm-password',
        required: true
      }),
      formError: new FormError(),
      button: new Button({
        type: 'submit',
        text: 'Зарегистрироваться',
        events: {
          click: event => {
            event.preventDefault();
            const data = shapedData('#form-signup');
            if (data) {
              if (data['password'] !== data['confirm-password']) {
                console.log('children: ', this.children);
                this.children.formError.setProps({ error: 'Пароли не совпадают' });
              } else {
                signup(data as FormSignUp).catch(error => {
                  console.log('error occurred: ', error);
                  this.children.formError.setProps({ error: error });
                });
              }
            }
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
