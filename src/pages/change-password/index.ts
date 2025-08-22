import template from './change-password.hbs?raw';
import Block from '../../modules/Block';
import Input from '../../components/input';
import Button from '../../components/button';
import shapedData from '../../utils/shapeData';
import RouterManagement from '../../modules/routing/RouterManagement';
import { updatePassword } from '../../controllers/user';
import { FormChangePassword } from '../../api/types';
import FormError from '../../components/form-error';
import { ROUTES } from '../../modules/routing/Constants';

class ChangePasswordPage extends Block {
  constructor() {
    super({
      inputOldPassword: new Input({
        type: 'password',
        name: 'oldPassword',
        label: 'Старый пароль',
        id: 'oldPassword',
        required: true
      }),
      inputPassword: new Input({
        type: 'password',
        name: 'newPassword',
        label: 'Новый пароль',
        id: 'newPassword',
        required: true
      }),
      inputConfirmPassword: new Input({
        type: 'password',
        name: 'confirm-password',
        label: 'Повторите пароль',
        id: 'confirm-password',
        required: true
      }),
      formError: new FormError(),
      buttonSubmit: new Button({
        type: 'submit',
        text: 'Сохранить изменения',
        events: {
          click: event => {
            event.preventDefault();
            const data = shapedData('#form-change-password');
            if (data) {
              if (data['newPassword'] !== data['confirm-password']) {
                console.log('children: ', this.children);
                this.children.formError.setProps({ error: 'Пароли не совпадают' });
              } else {
                updatePassword(data as FormChangePassword).then(() => {
                  RouterManagement.go(ROUTES.Settings);
                }).catch(error => {
                  console.log('error occurred: ', error);
                  this.children.formError.setProps({ error: error });
                });
              }
            }
          }
        }
      }),
      buttonLinkProfile: new Button({
        imgSrc: '/arrow-left.svg',
        class: 'btn-link-in-profile',
        events: {
          click: () => {
            RouterManagement.go(ROUTES.Settings);
          }
        }
      })
    });
  }

  render() {
    return template;
  }
}

export { ChangePasswordPage as ChangePassword };
