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
        <div
          class="row items-center absolute-right on-right q-gutter-md q-mr-md"
        >
          <q-btn icon="sports_esports" @click="navToJoin">Join game</q-btn>
          <q-btn icon="logout" @click="logout">Logout</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
export default {
  data() {
    hello: '';
  },
  methods: {
    navToJoin() {
      this.$router.push('join/');
    },
    logout() {
      this.$router.push('/');
    },
  },
};
</script>
