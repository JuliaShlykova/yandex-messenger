import Handlebars from 'handlebars';
import './chat-window.scss';
import Block from '../../../../modules/Block';
import template from './chat-window.hbs?raw';
import { PropType } from '../../../../modules/types';
import PopupMenu from './components';
import Button from '../../../../components/button';

Handlebars.registerHelper('checkUser', function(author) {
  return author === 'User';
});

class ChatWindow extends Block {
  constructor(props: PropType) {
    super({
      ...props,
      buttonSendMessage: new Button({
        imgSrc: '/send-rocket.svg',
        alt: 'send message',
        class: 'btn-send-msg',
        type: 'submit'
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
        settings: {
          withInternalId: true
        }
      })
    });
  }

  render() {
    this.children.popUpMenu.hide();
    this.children.buttonCloseMenu.hide();
    return template;
  }
}

export default ChatWindow;
