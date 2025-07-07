import Handlebars from 'handlebars';
import './chat-window.scss';
import Block from '../../../../modules/Block';
import template from './chat-window.hbs?raw';
import { PropType } from '../../../../modules/types';

Handlebars.registerHelper('checkUser', function(author) {
  return author === 'User';
});

class ChatWindow extends Block {
  constructor(props: PropType) {
    super({
      ...props,
      settings: {
        withInternalId: true
      }
    });
  }

  render() {
    return template;
  }
}

export default ChatWindow;
