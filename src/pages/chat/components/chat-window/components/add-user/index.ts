import Button from '../../../../../../components/button';
import FormError from '../../../../../../components/form-error';
import Input from '../../../../../../components/input';
import { addUser } from '../../../../../../controllers/chat';
import Block, { BlockProps } from '../../../../../../modules/Block';
import { withCurrentChat } from '../../../../../../modules/store/connect';
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
      formError: new FormError(),
      buttonCreate: new Button({
        type: 'submit',
        text: 'Пригласить',
        events: {
          click: event => {
            event.preventDefault();
            const data = shapedData('#form-add-user');
            if (data && data['login']) {
              addUser(data['login'] as string, this.props.currentChat as number)
                  .then(() => {
                    this.hide();
                  })
                  .catch(err => {
                    this.children.formError.setProps({ error: err });
                  });
            }
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

export default withCurrentChat(AddUser);
