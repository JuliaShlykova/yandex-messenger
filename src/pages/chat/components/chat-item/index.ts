import './chat-item.scss';
import Block, { BlockProps } from '../../../../modules/Block';
import template from './chat-item.hbs?raw';

class ChatItem extends Block {
  constructor(props: BlockProps) {
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
