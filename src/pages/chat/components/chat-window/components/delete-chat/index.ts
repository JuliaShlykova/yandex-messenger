import Button from '../../../../../../components/button';
import Block, { BlockProps } from '../../../../../../modules/Block';
import submit from '../../../../../../utils/submit';
import template from './delete-chat.hbs?raw';

class DeleteChat extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      settings: {
        withInternalId: true
      },
      buttonDelete: new Button({
        type: 'submit',
        text: 'Удалить',
        events: {
          click: event => {
            event.preventDefault();
            submit('#form-delete-chat');
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

export default DeleteChat;
