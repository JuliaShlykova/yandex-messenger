import Button from '../../../../../../components/button';
import FormError from '../../../../../../components/form-error';
import Input from '../../../../../../components/input';
import { removeUsers } from '../../../../../../controllers/chat';
import { setParticipants } from '../../../../../../controllers/setState';
import Block, { BlockProps } from '../../../../../../modules/Block';
import { withCurrentChatAndParticipants } from '../../../../../../modules/store/connect';
import isObjectEmpty from '../../../../../../utils/isObjectEmpty';
import shapedData from '../../../../../../utils/shapeData';
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
      formError: new FormError(),
      buttonCreate: new Button({
        type: 'submit',
        text: 'Убрать',
        events: {
          click: event => {
            event.preventDefault();
            const data = shapedData('#form-remove-user');
            if (isObjectEmpty(data)||!data) {
              this.children.formError.setProps({ error: 'Выберите хотя бы одного участника' });
            } else {
              let users;
              if (Array.isArray(data['users'])) {
                users = data['users'].map(id => Number(id));
              } else {
                users = [Number(data['users'])];
              }
              removeUsers(users, this.props.currentChat as number)
                  .then(() => {
                    setParticipants();
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

export default withCurrentChatAndParticipants(RemoveUser);
// export default RemoveUser;
