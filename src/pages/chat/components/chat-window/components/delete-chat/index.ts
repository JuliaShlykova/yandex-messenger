import Button from '../../../../../../components/button';
import { deleteChat } from '../../../../../../controllers/chat';
import Block, { BlockProps } from '../../../../../../modules/Block';
import { withCurrentChat } from '../../../../../../modules/store/connect';
import store from '../../../../../../modules/store/store';
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
            deleteChat(this.props.currentChat as number)
                .then(() => {
                  store.set('currentChat', undefined);
                })
                .catch(err => {
                  console.log(err);
                });
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

export default withCurrentChat(DeleteChat);
