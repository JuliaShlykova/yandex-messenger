import { FormChatCreate } from '../../../../api/types';
import Button from '../../../../components/button';
import FormError from '../../../../components/form-error';
import Input from '../../../../components/input';
import { createChat } from '../../../../controllers/chat';
import Block, { BlockProps } from '../../../../modules/Block';
import shapedData from '../../../../utils/shapeData';
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
      formError: new FormError(),
      buttonCreate: new Button({
        type: 'submit',
        text: 'Создать',
        events: {
          click: event => {
            event.preventDefault();
            const data = shapedData('#form-create-chat');
            if (data) {
              createChat(data as FormChatCreate)
                  .then(() => this.hide())
                  .catch(error => {
                    console.log('error occurred: ', error);
                    this.children.formError.setProps({ error: error });
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

export default CreateChat;
