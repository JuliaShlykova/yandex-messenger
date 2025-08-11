import Handlebars from 'handlebars';
import './chat-item.scss';
import Block, { BlockProps } from '../../../../modules/Block';
import template from './chat-item.hbs?raw';

Handlebars.registerHelper('transformToDay', function(str: string) {
  if (str) {
    const d = new Date(str);
    return new Intl.DateTimeFormat('ru-Ru', { weekday: 'short' }).format(d);
  }
  return;
});

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
