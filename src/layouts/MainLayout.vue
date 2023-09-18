<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="row items-center">
          <q-icon name="circle" />
          <q-icon name="circle" color="black" />
          <q-icon name="circle" />
          <q-icon name="circle" color="black" />
          <q-icon name="circle" />
          <q-toolbar-title> Go moku moku! </q-toolbar-title>
          <q-icon name="circle" />
          <q-icon name="circle" color="black" />
          <q-icon name="circle" />
          <q-icon name="circle" color="black" />
          <q-icon name="circle" />
        </div>
        <div class="text-h4 text-center q-mx-xl q-px-xl">
          {{ gameCode }}
        </div>
        <div
          class="row items-center absolute-right on-right q-gutter-md q-mr-md"
        >
          <q-btn icon="sports_esports" @click="navToJoin">Join game</q-btn>
          <q-btn icon="logout" @click="logout">{{
            username ? 'Logout' : 'Login'
          }}</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view
        :username="username"
        :gameCode="gameCode"
        :socketService="socketService"
        @update-user="updateUser"
        @update-code="updateGameCode"
      />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
export default {
  props: ['socketService'],
  data() {
    return {
      username: '',
      gameCode: '',
    };
  },
  methods: {
    navToJoin() {
      this.gameCode = '';
      this.$router.replace('join/');
    },
    logout() {
      this.username = '';
      this.gameCode = '';
      this.$router.replace('/');
    },
    updateUser(username: string) {
      this.username = username;
    },
    updateGameCode(gameCode: string) {
      this.gameCode = gameCode;
    },
  },
};
</script>
