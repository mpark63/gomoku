import { io } from 'socket.io-client';
import { getApiUrl } from './utils';

class SocketioService {
  socket;
  positions = [];

  setupSocketConnection() {
    this.socket = io(getApiUrl());

    this.socket.on('connect', function () {
      console.log('connected to socket');
    });
  }
}

export default SocketioService;
