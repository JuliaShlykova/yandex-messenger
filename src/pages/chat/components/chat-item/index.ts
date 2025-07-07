import './chat-item.scss';
import Block from '../../../../modules/Block';
import template from './chat-item.hbs?raw';
import { PropType } from '../../../../modules/types';

class ChatItem extends Block {
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

export default ChatItem;
