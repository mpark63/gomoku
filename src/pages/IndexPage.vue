<template>
  <q-page class="row items-center justify-evenly">
    <q-dialog v-model="loginFailed">
      <q-banner rounded class="bg-purple-8 text-white">
        Invalid username or password
      </q-banner>
    </q-dialog>
    <q-card class="q-pa-xl bg-blue-2 flex-center">
      <h2>Login to play Gomoku</h2>
      <div class="col-4 q-gutter-y-md">
        <q-input outlined v-model="username" label="Username" stack-label />
        <q-input
          outlined
          type="password"
          v-model="password"
          label="Password"
          stack-label
        />
        <q-btn label="signup / login" @click="login" color="secondary" />
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import axios from 'axios';
import { getApiUrl } from 'src/utils';

export default {
  data() {
    return {
      username: '',
      password: '',
      loginFailed: false,
    };
  },
  methods: {
    login() {
      axios
        .post(`${getApiUrl()}/login`, {
          username: this.username,
          password: this.password,
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          this.$emit('update-user', res.data.data.username);
          this.$router.push('/join');
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
          console.log(err.response.data.message);
          this.loginFailed = true;
        });
    },
  },
};
</script>
