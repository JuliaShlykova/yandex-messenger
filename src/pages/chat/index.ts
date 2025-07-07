import './chat.scss';
import template from './chat.hbs?raw';
import Block from '../../modules/Block';
import SearchBar from './components/search-bar';
import ChatItem from './components/chat-item';
import { chatInfo, chatWindow } from './mockdata';
import applyPage from '../../utils/applyPage';
import ChatWindow from './components/chat-window';

const chatItemComponent = new ChatItem({
  ...chatInfo,
  events: {
    click: (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      if (target) {
        target.classList.add('chosen');
      }
      const chat = new ChatWindow(chatWindow);
      applyPage(chat, '.chat-window-wrapper');
    }
  }
});

class ChatPage extends Block {
  constructor() {
    super({
      searchBar: new SearchBar(),
      chatitem: chatItemComponent
    });
  }

  render() {
    return template;
  }
}

export { ChatPage as Chat };
