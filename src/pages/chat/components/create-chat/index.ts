import Button from '../../../../components/button';
import Input from '../../../../components/input';
import Block, { BlockProps } from '../../../../modules/Block';
import submit from '../../../../utils/submit';
import template from './create-chat.hbs?raw';

class CreateChat extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      settings: {
        withInternalId: true
      },
      inputChatName: new Input({
        type: 'text',
        name: 'title',
        label: 'Название чата',
        id: 'chat-title',
        required: true
      }),
      buttonCreate: new Button({
        type: 'submit',
        text: 'Создать',
        events: {
          click: event => {
            event.preventDefault();
            submit('#form-create-chat');
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

export default CreateChat;
