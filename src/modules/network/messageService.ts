// socket.addEventListener('open', onOpen); // соединение установлено
// socket.addEventListener('message', onMessage); // пришло новое сообщение
// socket.addEventListener('error', onError); // ошибка
// socket.addEventListener('close', onClose); // сокет закрылся

import makeDisplayName from '../../utils/makeDisplayName';
import store from '../store/store';
import { Nullable } from '../types';
import { HOSTWEBSOCKET } from './Constants';

// 0 – CONNECTING — соединение ещё не установлено
// 1 – OPEN — соединение установлено, обмен данными
// 2 – CLOSING — соединение закрывается
// 3 – CLOSED — соединение закрыто
// if (socket.readyState === 1) {
//   socket.send('Hello, Server!');
// }

export type WebSocketProps = {
  userId: number,
  chatId: number,
  token: string
}

export type MessageType = {
  user_id?: number,
  content: string,
  type: string,
  time?: string,
  user_display_name?: string,
  user_avatar?: string
}

class MessageService {
  protected fullURl: string;
  private socket: Nullable<WebSocket>;

  public async init({
    userId,
    chatId,
    token
  }: WebSocketProps) {
    try {
      this.closeSocket();
      this.fullURl = `${HOSTWEBSOCKET}/chats/${userId}/${chatId}/${token}`;
      this.socket = new WebSocket(this.fullURl);

      this.socket.addEventListener('open', () => {
        console.log('Соединение установлено');
        this.getMessages();
      });

      this.socket.addEventListener('close', event => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });

      this.socket.addEventListener('message', event => {
        const messages = JSON.parse(event.data);
        const participants = store.getState().participants;
        if (Array.isArray(messages)) {
          store.set('messages', messages.reverse().map(msg => {
            const user = participants?.find(p => p.id === msg.user_id);
            if (user) {
              msg.user = user;
            }
            return msg;
          }));
        } else if (messages.type === 'message') {
          const oldMessages = store.getState().messages as MessageType[];
          store.set('messages', [...oldMessages, messages]);
        }
      });

      this. socket.addEventListener('error', event => {
        console.log('Ошибка', event);
      });
    } catch (err) {
      console.log(err);
    }
  }

  private getMessages() {
    if (this.socket) {
      this.send({
        content: '0',
        type: 'get old'
      });
    }
  }

  public send(message: MessageType) {
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }
  }

  public sendPlainMessage(text: string) {
    this.send({
      content: text,
      type: 'message'
    });
  }

  public closeSocket() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

const msgServiceInstance = new MessageService();

export default msgServiceInstance;
