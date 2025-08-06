import Button from '../../../../../../components/button';
import Input from '../../../../../../components/input';
import Block, { BlockProps } from '../../../../../../modules/Block';
import shapedData from '../../../../../../utils/shapeData';
import template from './add-user.hbs?raw';

class AddUser extends Block {
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
        id: 'login-participant',
        required: true
      }),
      buttonCreate: new Button({
        type: 'submit',
        text: 'Пригласить',
        events: {
          click: event => {
            event.preventDefault();
            shapedData('#form-add-user');
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

export default AddUser;
