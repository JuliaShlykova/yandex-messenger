import template from './change-password.hbs?raw';
import Block from '../../modules/Block';
import Input from '../../components/input';
import Button from '../../components/button';
import shapedData from '../../utils/shapeData';
import RouterManagement from '../../modules/routing/RouterManagement';

class ChangePasswordPage extends Block {
  constructor() {
    super({
      inputOldPassword: new Input({
        type: 'password',
        name: 'old-password',
        label: 'Старый пароль',
        id: 'old-password',
        required: true
      }),
      inputPassword: new Input({
        type: 'password',
        name: 'password',
        label: 'Новый пароль',
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
            shapedData('#form-change-password');
          }
        }
      }),
      buttonLinkProfile: new Button({
        imgSrc: '/arrow-left.svg',
        class: 'btn-link-in-profile',
        events: {
          click: () => {
            RouterManagement.go('/settings');
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
