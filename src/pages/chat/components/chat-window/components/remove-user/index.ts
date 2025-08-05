import Button from '../../../../../../components/button';
import Input from '../../../../../../components/input';
import Block, { BlockProps } from '../../../../../../modules/Block';
import submit from '../../../../../../utils/submit';
import template from './remove-user.hbs?raw';

class RemoveUser extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      settings: {
        withInternalId: true
      },
      inputUserName: new Input({
        type: 'text',
        name: 'login',
        label: 'Введите логин участника',
        id: 'login-participant-remove',
        required: true
      }),
      buttonCreate: new Button({
        type: 'submit',
        text: 'Убрать',
        events: {
          click: event => {
            event.preventDefault();
            submit('#form-remove-user');
          }
        }
      }),
      buttonCancel: new Button({
        text: 'Отмена',
        class: 'btn-link',
        events: {
          click: () => {
            this.hide();
          }
        }
      })
    });
  }

  render() {
    return template;
  }
}

export default RemoveUser;
