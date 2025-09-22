import './chat.scss';
import template from './chat.hbs?raw';
import Block from '../../modules/Block';
import SearchBar from './components/search-bar';
import ChatItem from './components/chat-item';
import applyPage from '../../utils/applyPage';
import ChatWindow from './components/chat-window';
import Button from '../../components/button';
import RouterManagement from '../../modules/routing/RouterManagement';
import CreateChat from './components/create-chat';
import store, { StoreEvents } from '../../modules/store/store';
import { ChatsResponse } from '../../api/types';
import isObjectEqual from '../../utils/isObjectEqual';
import resourceUrl from '../../utils/resourceURL';
import msgServiceInstance from '../../modules/network/messageService';
import { getChatToken, getChatUsers } from '../../controllers/chat';
import { ROUTES } from '../../modules/routing/Constants';


class ChatPage extends Block {
  constructor() {
    const chats = store.getState().chats;
    console.log('constructing chat page, chats: ', chats);
    const currentChat = store.getState().currentChat;
    const userId = store.getState().user?.id;
    const userAvatar = store.getState().user?.avatar;
    console.log('current: ', currentChat);

    super({
      searchBar: new SearchBar({ settings: { withInternalId: true } }),
      chats: chats,
      currentChat: currentChat,
      userId: userId,
      buttonLinkToProfile: new Button({
        class: 'link-to-profile',
        imgSrc: userAvatar ? resourceUrl(userAvatar) : '',
        text: userAvatar ? '' : 'Я',
        events: {
          click: () => {
            RouterManagement.go(ROUTES.Settings);
          }
        }
      }),
      buttonCreateChat: new Button({
        class: 'btn-create-chat',
        imgSrc: '/pen.svg',
        events: {
          click: () => {
            this.children.createChat.show();
          }
        }
      }),
      createChat: new CreateChat({})
    });

    store.on(StoreEvents.UPDATED, () => {
      const newChats = store.getState().chats;
      const newCurrentChat = store.getState().currentChat;
      if (newChats) {
        const chatsChanged = !isObjectEqual(this.props.chats as unknown[], newChats);
        const currentChatChanged = !(this.props.currentChat === newCurrentChat);
        if (!chatsChanged && !currentChatChanged) return;
        if (chatsChanged && currentChatChanged) {
          this.setProps({ currentChat: newCurrentChat, chats: newChats });
        } else if (chatsChanged) {
          this.setProps({ chats: newChats });
        } else {
          this.setProps({ currentChat: newCurrentChat });
        }
        console.log('chat page did update');
        this.renderChatItems();
        this.renderCurrentChat();
      }
    });
  }

  componentDidMount() {
    this.renderChatItems();
    this.renderCurrentChat();
  }

  public async renderCurrentChat() {
    const { currentChat, chats, userId } = this.props;
    if (currentChat && chats) {
      const currentChatInfo = (chats as ChatsResponse).find(chat=>chat.id===this.props.currentChat);
      const token = await getChatToken(currentChat as number);
      if (token) {
        await msgServiceInstance.init({ chatId: (currentChat as number), userId: (userId as number), token });
      }
      const participants = await getChatUsers(currentChat as number);
      store.set('participants', participants);
      const chat = new ChatWindow({ ...currentChatInfo });
      applyPage(chat, '.chat-window-wrapper');
    }
  }

  public async renderChatItems() {
    const chatsListWrapper = this.getContent().querySelector('.chats-list');
    if (!chatsListWrapper) return;
    chatsListWrapper.innerHTML = '';
    (this.props.chats as ChatsResponse)?.forEach(chatInfo => {
      const chatItem = new ChatItem({
        ...chatInfo,
        class: (this.props.currentChat === chatInfo.id)?'chosen':'',
        events: {
          click: (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            if (target) {
              store.set('messages', undefined);
              store.set('currentChat', chatInfo.id);
            }
          }
        }
      });
      const content = chatItem.getContent();
      if (content) {
        chatsListWrapper.appendChild(content);
      }
    });
  }

  render() {
    this.children.createChat.hide();

    return template;
  }
}

export { ChatPage as Chat };
