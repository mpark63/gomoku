<template>
  <router-view :socketService="socketService" />
</template>

<script>
import SocketioService from './socketio.service.js';

export default {
  name: 'App',
  data() {
    return {
      socketService: null,
    };
  },
  created() {
    this.socketService = new SocketioService();
    this.socketService.setupSocketConnection();
  },
  provide() {
    return {
      socketService: this.socketService,
    };
  },
};
</script>
