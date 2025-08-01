import Button from '../../../../../components/button';
import Block, { BlockProps } from '../../../../../modules/Block';
import template from './pop-up-menu.hbs?raw';
import './pop-up-menu.scss';

class PopupMenu extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      buttonAddUser: new Button({
        text: 'Добавить пользователя',
        imgSrc: '/add-user.svg',
        class: 'btn-in-menu'
      }),
      buttonRemoveUser: new Button({
        text: 'Убрать пользователя',
        imgSrc: '/remove-user.svg',
        class: 'btn-in-menu'
      }),
      buttonRenameChat: new Button({
        text: 'Переименовать чат',
        imgSrc: '/rename-chat.svg',
        class: 'btn-in-menu'
      }),
      buttonDeleteChat: new Button({
        text: 'Удалить чат',
        imgSrc: '/delete-chat.svg',
        class: 'btn-in-menu'
      })
    });
  }

  render() {
    return template;
  }
}

export default PopupMenu;
