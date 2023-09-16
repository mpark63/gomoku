import { io } from 'socket.io-client';

class SocketioService {
  socket;
  positions = [];

  setupSocketConnection() {
    this.socket = io('http://localhost:4567');

    this.socket.on('connect', function () {
      console.log('connected to socket');
    });
  }
}

export default SocketioService;
