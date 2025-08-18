import Handlebars from 'handlebars';
import './chat-window.scss';
import Block, { BlockProps } from '../../../../modules/Block';
import template from './chat-window.hbs?raw';
import PopupMenu from './components/pop-up-menu';
import Button from '../../../../components/button';
import AddUser from './components/add-user';
import RemoveUser from './components/remove-user';
import DeleteChat from './components/delete-chat';
import store, { Indexed } from '../../../../modules/store/store';
import { withMessages } from '../../../../modules/store/connect';
import shapedData from '../../../../utils/shapeData';
import msgServiceInstance from '../../../../modules/http/messageService';

Handlebars.registerHelper('checkUser', function(authorId) {
  return authorId === (store.getState().user as Indexed).id;
});

Handlebars.registerHelper('transformDateToLocal', function(str: string) {
  const d = new Date(str);
  return d.toLocaleString();
});

class ChatWindow extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      settings: {
        withInternalId: true
      },
      buttonSendMessage: new Button({
        imgSrc: '/send-rocket.svg',
        alt: 'send message',
        class: 'btn-send-msg',
        type: 'submit',
        events: {
          click: event => {
            event.preventDefault();
            const data = shapedData('#form-message');
            if (data && data['message']) {
              msgServiceInstance.sendPlainMessage(data['message'] as string);
            }
          }
        }
      }),
      buttonOpenMenu: new Button({
        imgSrc: '/three-lines.svg',
        alt: 'open chat menu',
        events: {
          click: () => {
            this.children.buttonOpenMenu.hide();
            this.children.popUpMenu.show();
            this.children.buttonCloseMenu.show();
          }
        }
      }),
      buttonCloseMenu: new Button({
        imgSrc: '/cross.svg',
        alt: 'close chat menu',
        events: {
          click: () => {
            this.children.buttonCloseMenu.hide();
            this.children.popUpMenu.hide();
            this.children.buttonOpenMenu.show();
          }
        }
      }),
      popUpMenu: new PopupMenu({
        onAddUser: () => {
          this.children.addUser.show();
        },
        onRemoveUser: () => {
          this.children.removeUser.show();
        },
        onDeleteChat: () => {
          this.children.deleteChat.show();
        }
      }),
      addUser: new AddUser({}),
      removeUser: new RemoveUser({}),
      deleteChat: new DeleteChat({})
    });
  }

  render() {
    this.children.addUser.hide();
    this.children.removeUser.hide();
    this.children.deleteChat.hide();
    this.children.popUpMenu.hide();
    this.children.buttonCloseMenu.hide();
    return template;
  }
}

export default withMessages(ChatWindow);
