// socket.addEventListener('open', onOpen); // соединение установлено
// socket.addEventListener('message', onMessage); // пришло новое сообщение
// socket.addEventListener('error', onError); // ошибка
// socket.addEventListener('close', onClose); // сокет закрылся

// 0 – CONNECTING — соединение ещё не установлено
// 1 – OPEN — соединение установлено, обмен данными
// 2 – CLOSING — соединение закрывается
// 3 – CLOSED — соединение закрыто
// if (socket.readyState === 1) {
//   socket.send('Hello, Server!');
// }

const socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>');

// in open we immediately send a message to everyone, who is connected
socket.addEventListener('open', function(event) {
  console.log('Соединение установлено');

  socket.send(JSON.stringify({
    content: 'My first message!',
    type: 'message'
  }));
});

// message is evoked, when server sends a message
socket.addEventListener('message', function(event) {
  console.log('Сообщение от сервера:', event.data);
});

// close is evoked when something has killed the process
socket.addEventListener('close', event => {
  if (event.wasClean) {
    console.log('connection is closed cleanly');
  } else {
    console.log('connection is closed abruptly');
  }

  console.log(`Code: ${event.code} | Cause: ${event.reason}`);
});

socket.addEventListener('error', event => {
  console.log('Error', event.message);
});

// Дождитесь появления в консоли сообщения об установке соединения
if (socket.readyState === 1) {
  socket.send('Привет, сервер!');
}

const wsClient = new WebSocketClient('wss://example.com/ws');

const chatRooms = [];
const messages = [];

wsClient.subscribe('chatMessage', payload => {
  messages.push(payload.message);
});

wsClient.send('chatMessage', { chatId: 'id', message: 'Anyway...', author: 'Johnny' });
