<template>
  <q-page class="row flex-center no-wrap bg-blue-grey-3">
    <div class="q-pa-md q-gutter-sm">
      <q-dialog
        v-model="game.gameOver"
        no-esc-dismiss
        no-backdrop-dismiss
        no-route-dismiss
      >
        <q-banner rounded class="bg-purple-8 text-white">
          Game over! {{ game.currentTurn }} wins!
          <template v-slot:action>
            <q-btn
              flat
              color="white"
              label="Start new game"
              @click="navToJoin"
            />
          </template>
        </q-banner>
      </q-dialog>
    </div>
    <div class="row">
      <q-card flat class="bg-blue-grey-3">
        <q-card-section>
          <q-icon :name="blackIcon" size="300px" :label="'hello'" />
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="text-h6 text-center">{{ game.blackUsername }}</div>
          <div
            class="text-h6 text-center"
            v-if="game.blackUsername == username"
          >
            (you)
          </div>
        </q-card-section>
      </q-card>
    </div>
    <canvas
      ref="myCanvas"
      width="600"
      height="600"
      @mousemove="getMousePos"
      @click="placePiece"
    ></canvas>
    <div>
      <q-card flat class="bg-blue-grey-3">
        <q-card-section>
          <q-icon :name="whiteIcon" size="300px" color="white" />
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div v-if="game.whiteUsername" class="text-h6 text-center">
            {{ game.whiteUsername }}
          </div>
          <div v-else class="text-h6 text-center">
            <div>Invite player with code:</div>
            {{ gameCode }}
          </div>
          <div
            class="text-h6 text-center"
            v-if="game.whiteUsername == username"
          >
            (you)
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import axios from 'axios';
import { getApiUrl, drawBoard } from 'src/utils';

export default {
  props: ['username', 'gameCode', 'socketService'],
  mounted() {
    if (!this.gameCode) {
      return this.$router.push('/join');
    }
    // join socket
    this.socketService.socket.emit('join game', this.username, this.gameCode);
    // update
    this.socketService.socket.on('update', (game: any) => {
      console.log('updating');
      this.game = game;
      if (this.canvas && this.ctx) {
        drawBoard(this.canvas, this.ctx, this.game.positions);
      }
    });

    // get game
    axios
      .get(`${getApiUrl()}/games/${this.gameCode}?username=${this.username}`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        // restore game state
        this.game = res.data.data;

        // draw board
        var canvas = this.$refs.myCanvas as HTMLCanvasElement;
        var ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx = ctx;
        if (this.canvas && this.ctx) {
          drawBoard(this.canvas, this.ctx, this.game.positions);
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        alert(err.response.data.message);
      });
  },
  data() {
    return {
      canvas: null as HTMLCanvasElement | null,
      ctx: null as CanvasRenderingContext2D | null,
      mouseX: 0,
      mouseY: 0,
      game: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        currentTurn: 'black',
        positions: [] as string[][],
        gameOver: false,
        blackUsername: '',
        whiteUsername: '',
      },
    };
  },
  computed: {
    blackIcon(): string {
      return this.game.currentTurn === 'black' ? 'emoji_people' : 'boy';
    },
    whiteIcon(): string {
      return this.game.currentTurn === 'white' ? 'emoji_people' : 'boy';
    },
  },
  methods: {
    async placePiece() {
      if (!this.ctx) return;

      // snappy to grid lines
      let tempX =
        this.mouseX % 30 < 15
          ? Math.floor(this.mouseX / 30)
          : Math.ceil(this.mouseX / 30);
      let tempY =
        this.mouseY % 30 < 15
          ? Math.floor(this.mouseY / 30)
          : Math.ceil(this.mouseY / 30);

      tempX--;
      tempY--;
      // client check that move is valid
      if (
        tempY < 0 ||
        tempX < 0 ||
        tempX > 18 ||
        tempY > 18 ||
        this.game.positions[tempX][tempY] !== ''
      ) {
        return alert('Illegal move!');
      }

      try {
        await axios.patch(`${getApiUrl()}/games/${this.gameCode}`, {
          username: this.username,
          x: tempX,
          y: tempY,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        alert(err.response.data.message);
      }
    },
    getMousePos(e: MouseEvent) {
      if (this.canvas) {
        var rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
      }
    },
    navToJoin() {
      this.$emit('update-code', '');
      this.$router.push('join/');
    },
  },
};
</script>

<style>
canvas {
  border: 1px solid #814141;
  background-color: #e5aa70;
}
</style>
