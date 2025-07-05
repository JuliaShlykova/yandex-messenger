import template from './profile.hbs?raw';
import Block from '../../modules/Block';
import Input from '../../components/input';
import Button from '../../components/button';

class ProfilePage extends Block {
  constructor() {
    super({
      inputFile: new Input({
        type: 'file',
        name: 'avatar',
        label: 'Фото профиля',
        id: 'avatar',
        settings: { withInternalId: true }
      }),
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
      buttonSubmit: new Button({
        type: 'submit',
        text: 'Сохранить изменения'
      }),
      buttonPassword: new Button({
        text: 'Изменить пароль'
      })
    });
  }

  render() {
    return template;
  }
}

export { ProfilePage as Profile };
