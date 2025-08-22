import './profile.scss';
import template from './profile.hbs?raw';
import Block from '../../modules/Block';
import Input from '../../components/input';
import Button from '../../components/button';
import shapedData from '../../utils/shapeData';
import RouterManagement from '../../modules/routing/RouterManagement';
import InputField from '../../components/input/input-field';
import { logout } from '../../controllers/auth';
import store, { StoreEvents } from '../../modules/store/store';
import { FormProfile, UserResponse } from '../../api/types';
import { updateAvatar, updateProfile } from '../../controllers/user';
import FormError from '../../components/form-error';
import resourceUrl from '../../utils/resourceURL';
import msgServiceInstance from '../../modules/network/messageService';
import makeDisplayName from '../../utils/makeDisplayName';
import { ROUTES } from '../../modules/routing/Constants';

class ProfilePage extends Block {
  constructor() {
    let user: UserResponse | undefined = store.getState().user as UserResponse | undefined;
    super({
      avatarSrc: user?.avatar ? resourceUrl(user.avatar) : '/image-placeholder.svg',
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
              updateAvatar(file).catch(error => {
                console.log('error occurred: ', error);
                this.children.formError.setProps({ error: error });
              });
            }
          }
        }
      }),
      inputFirstName: new Input({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        id: 'first-name',
        value: user?.first_name,
        required: true
      }),
      inputLastName: new Input({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        id: 'second-name',
        value: user?.second_name,
        required: true
      }),
      inputDisplayName: new Input({
        type: 'text',
        name: 'display_name',
        label: 'Отображаемое имя',
        id: 'display-name',
        value: user?.display_name ? user.display_name : makeDisplayName(user?.first_name, user?.second_name),
        required: true
      }),
      inputLogin: new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        id: 'login',
        value: user?.login,
        required: true
      }),
      inputEmail: new Input({
        type: 'email',
        name: 'email',
        label: 'Почта',
        id: 'email',
        value: user?.email,
        required: true
      }),
      inputPhone: new Input({
        type: 'tel',
        name: 'phone',
        label: 'Телефон',
        id: 'phone',
        value: user?.phone,
        required: true
      }),
      formError: new FormError(),
      buttonSubmit: new Button({
        type: 'submit',
        text: 'Сохранить изменения',
        events: {
          click: event => {
            event.preventDefault();
            const data = shapedData('#form-profile');
            if (data) {
              updateProfile(data as FormProfile).catch(error => {
                console.log('error occurred: ', error);
                this.children.formError.setProps({ error: error });
              });
            }
          }
        }
      }),
      buttonPassword: new Button({
        text: 'Изменить пароль',
        events: {
          click: () => {
            RouterManagement.go(ROUTES.ChangePassword);
          }
        }
      }),
      buttonLogout: new Button({
        text: 'Выйти',
        class: 'btn-link',
        events: {
          click: () => {
            msgServiceInstance.closeSocket();
            logout();
          }
        }
      }),
      buttonLinkMessenger: new Button({
        imgSrc: '/arrow-left.svg',
        class: 'btn-link-in-profile',
        events: {
          click: () => {
            RouterManagement.go(ROUTES.Messenger);
          }
        }
      })
    });

    store.on(StoreEvents.Updated, () => {
      const newUser = store.getState().user as UserResponse;
      if (!(this.props.avatarSrc === resourceUrl(newUser.avatar))) {
        this.setProps({ avatarSrc: resourceUrl(newUser.avatar) });
      }
      user = newUser;
    });
  }

  render() {
    return template;
  }
}
export { ProfilePage as Profile };
