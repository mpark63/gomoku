<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="col-5 q-pa-xl bg-blue-2 flex-center">
      <h2>Join existing game</h2>
      <q-input outlined v-model="inviteCode" label="Invite code" stack-label>
        <template v-slot:append>
          <q-btn
            icon="sports_esports"
            color="secondary"
            @click="joinGame"
            round
            class="cursor-pointer"
          />
        </template>
      </q-input>
    </q-card>
    <q-card class="col-5 q-pa-xl bg-blue-2 flex-center">
      <h2>Create new game</h2>
      <q-btn label="create game" @click="createGame" color="secondary" />
    </q-card>
  </q-page>
</template>

<script lang="ts">
import axios from 'axios';
import { getApiUrl } from 'src/utils';

export default {
  props: ['username', 'gameCode'],
  mounted() {
    if (!this.username) {
      this.$router.push('/');
    }
  },
  data() {
    return {
      inviteCode: '',
    };
  },
  methods: {
    joinGame() {
      // try to get game with invite code
      axios
        .get(
          `${getApiUrl()}/games/${this.inviteCode}?username=${this.username}`
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          this.$emit('update-code', res.data.data.code);
          this.$router.push('/game');
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
          alert('Something went wrong!');
          this.inviteCode = '';
          console.log(err);
        });
    },
    createGame() {
      // create new game
      axios
        .post(`${getApiUrl()}/games`, {
          blackUsername: this.username,
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          this.$emit('update-code', res.data.data.code);
          this.$router.push('/game');
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
          alert('Something went wrong!');
          console.log(err);
        });
    },
  },
};
</script>
