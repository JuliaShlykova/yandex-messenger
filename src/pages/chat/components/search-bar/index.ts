import './search-bar.scss';
import Block, { BlockProps } from '../../../../modules/Block';
import template from './search-bar.hbs?raw';
import Button from '../../../../components/button';
import store from '../../../../modules/store/store';
import { setChats } from '../../../../controllers/setState';

class SearchBar extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      buttonSearch: new Button({
        type: 'submit',
        imgSrc: '/search.svg',
        alt: 'search',
        events: {
          click: event => {
            event.preventDefault();
            const inputSearch = document.querySelector('#search-chat') as HTMLInputElement;
            const searchData = inputSearch?.value;
            if (searchData) {
              const chats = store.getState().chats;
              if (chats) {
                const filteredChats = chats.filter(chat => chat.title.includes(searchData));
                store.set('chats', filteredChats);
              }
            } else {
              setChats();
            }
          }
        }
      })
    });
  }

  render() {
    return template;
  }
}

export default SearchBar;
