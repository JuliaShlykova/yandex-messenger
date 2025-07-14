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

const socket = new WebSocket('wss://ws.postman-echo.com/raw');

socket.addEventListener('open', function(event) {
  console.log('Соединение установлено');
});

socket.addEventListener('message', function(event) {
  console.log('Сообщение от сервера:', event.data);
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
