import './chat.scss';
import template from './chat.hbs?raw';
import Block from '../../modules/Block';
import SearchBar from './components/search-bar';
import ChatItem from './components/chat-item';
import { chatInfo, chatWindow } from './mockdata';
import applyPage from '../../utils/applyPage';
import ChatWindow from './components/chat-window';
import Button from '../../components/button';
import RouterManagement from '../../modules/routing/RouterManagement';

const chatItemComponent = new ChatItem({
  ...chatInfo,
  events: {
    click: (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      if (target) {
        target.classList.add('chosen');
      }
      const chat = new ChatWindow({...chatWindow, settings: {withInternalId: true}});
      applyPage(chat, '.chat-window-wrapper');
    }
  }
});

class ChatPage extends Block {
  constructor() {
    super({
      searchBar: new SearchBar({settings: {withInternalId: true}}),
      chatitem: chatItemComponent,
      buttonLinkToProfile: new Button({
        class: "link-to-profile",
        text: "A",
        events: {
          click: () => {
            RouterManagement.go('/settings');
          }
        }
      }),
      buttonCreateChat: new Button({
        class: 'btn-create-chat',
        imgSrc: '/pen.svg'
      })
    });
  }

  render() {
    return template;
  }
}

export { ChatPage as Chat };
