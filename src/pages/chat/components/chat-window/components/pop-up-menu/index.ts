import Button from '../../../../../../components/button';
import Block, { BlockProps } from '../../../../../../modules/Block';
import template from './pop-up-menu.hbs?raw';
import './pop-up-menu.scss';

class PopupMenu extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      settings: {
        withInternalId: true
      },
      buttonAddUser: new Button({
        text: 'Добавить пользователя',
        imgSrc: '/add-user.svg',
        class: 'btn-in-menu',
        events: {
          click: () => {
            (props.onAddUser as () => void)();
          }
        }
      }),
      buttonRemoveUser: new Button({
        text: 'Убрать пользователя',
        imgSrc: '/remove-user.svg',
        class: 'btn-in-menu',
        events: {
          click: () => {
            (props.onRemoveUser as () => void)();
          }
        }
      }),
      buttonRenameChat: new Button({
        text: 'Переименовать чат',
        imgSrc: '/rename-chat.svg',
        class: 'btn-in-menu',
        disabled: true
      }),
      buttonDeleteChat: new Button({
        text: 'Удалить чат',
        imgSrc: '/delete-chat.svg',
        class: 'btn-in-menu',
        events: {
          click: () => {
            (props.onDeleteChat as () => void)();
          }
        }
      })
    });
  }

  render() {
    return template;
  }
}

export default PopupMenu;
