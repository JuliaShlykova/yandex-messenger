import './chat.scss';
import template from './chat.hbs?raw';
import Block from '../../modules/Block';

class ChatPage extends Block {
  constructor() {
    super();
  }

  render() {
    return template;
  }
}

export { ChatPage as Chat };
