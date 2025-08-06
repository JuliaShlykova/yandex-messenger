import './profile.scss';
import template from './profile.hbs?raw';
import Block from '../../modules/Block';
import Input from '../../components/input';
import Button from '../../components/button';
import shapedData from '../../utils/shapeData';
import RouterManagement from '../../modules/routing/RouterManagement';
import InputField from '../../components/input/input-field';
import { logout } from '../../controllers/auth';

class ProfilePage extends Block {
  constructor() {
    super({
      avatarSrc: '/image-placeholder.svg',
      inputFile: new InputField({
        type: 'file',
        name: 'avatar',
        id: 'avatar',
        accept: 'image/*',
        events: {
          change: e => {
            const files = (e.target as HTMLInputElement).files;
            if (files?.length === 1) {
              const file = files[0];
              const fileURL = URL.createObjectURL(file);
              console.log(this.props.avatarSrc);
              this.setProps({ avatarSrc: fileURL });
              console.log(this.props.avatarSrc);
            }
          }
        }
      }),
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
        name: 'email',
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
        id: 'confirm-password',
        required: true
      }),
      buttonSubmit: new Button({
        type: 'submit',
        text: 'Сохранить изменения',
        events: {
          click: event => {
            event.preventDefault();
            shapedData('#form-profile');
          }
        }
      }),
      buttonPassword: new Button({
        text: 'Изменить пароль',
        events: {
          click: () => {
            RouterManagement.go('/change-password');
          }
        }
      }),
      buttonLogout: new Button({
        text: 'Выйти',
        class: 'btn-link',
        events: {
          click: () => {
            logout();
            // RouterManagement.go('/sign-in');
          }
        }
      }),
      buttonLinkMessenger: new Button({
        imgSrc: '/arrow-left.svg',
        class: 'btn-link-in-profile',
        events: {
          click: () => {
            RouterManagement.go('/messenger');
          }
        }
      })
    });
  }

  render() {
    return template;
  }
}

export { ProfilePage as Profile };
