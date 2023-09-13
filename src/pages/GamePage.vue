<template>
  <q-page class="row flex-center no-wrap bg-blue-grey-3">
    <div class="q-pa-md q-gutter-sm">
      <q-dialog
        v-model="gameOver"
        no-esc-dismiss
        no-backdrop-dismiss
        no-route-dismiss
      >
        <q-banner rounded class="bg-purple-8 text-white">
          Game over! {{ currentTurn }} wins!
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
      <q-icon :name="blackIcon" size="300px" />
    </div>
    <canvas
      ref="myCanvas"
      width="600"
      height="600"
      @mousemove="getMousePos"
      @click="placePiece"
    ></canvas>
    <div>
      <q-icon :name="whiteIcon" size="300px" color="white" />
    </div>
  </q-page>
</template>

<script lang="ts">
import axios from 'axios';
import {
  getApiUrl,
  drawDot,
  drawHorizLine,
  drawPiece,
  drawVerticLine,
} from 'src/utils';

export default {
  props: ['username', 'gameCode'],
  mounted() {
    if (!this.gameCode) {
      return this.$router.push('/join');
    }
    // get game
    axios
      .get(`${getApiUrl()}/games/${this.gameCode}?username=${this.username}`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        // restore game state
        const game = res.data.data;
        this.currentTurn = game.currentTurn;
        this.positions = game.positions;
        this.gameOver = game.gameOver;

        // draw board
        var canvas = this.$refs.myCanvas as HTMLCanvasElement;
        var ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx = ctx;
        this.drawBoard();
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        console.log(err);
        alert('Something went wrong!');
      });
  },
  data() {
    return {
      canvas: null as HTMLCanvasElement | null,
      ctx: null as CanvasRenderingContext2D | null,
      currentTurn: 'black',
      mouseX: 0,
      mouseY: 0,
      positions: [] as string[][],
      gameOver: false,
    };
  },
  computed: {
    blackIcon(): string {
      return this.currentTurn === 'black' ? 'emoji_people' : 'boy';
    },
    whiteIcon(): string {
      return this.currentTurn === 'white' ? 'emoji_people' : 'boy';
    },
  },
  methods: {
    drawBoard() {
      if (this.ctx) {
        // draw lines for board
        for (let i = 30; i <= 570; i += 30) {
          this.ctx.beginPath();
          drawHorizLine(this.ctx, i);
          drawVerticLine(this.ctx, i);
          this.ctx.closePath();
        }

        // draw reference dots
        for (let i = 4; i <= 16; i += 6) {
          for (let j = 4; j <= 16; j += 6) {
            drawDot(this.ctx, i, j);
          }
        }

        // draw pieces
        for (let i = 0; i < 19; i++) {
          for (let j = 0; j < 19; j++) {
            if (this.positions[i][j] !== '') {
              drawPiece(this.ctx, i, j, this.positions[i][j]);
            }
          }
        }
      }
    },
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

      // client check that move is valid
      if (
        tempY < 0 ||
        tempX < 0 ||
        tempX > 18 ||
        tempY > 18 ||
        this.positions[tempX][tempY] !== ''
      ) {
        return alert('Illegal move!');
      }

      try {
        const res = await axios.patch(`${getApiUrl()}/games/${this.gameCode}`, {
          username: this.username,
          x: tempX,
          y: tempY,
        });
        // draw piece
        drawPiece(this.ctx, tempX, tempY, this.currentTurn);
        // update state
        const game = res.data.data;
        this.positions = game.positions;
        this.gameOver = game.gameOver;
        if (!this.gameOver) {
          this.currentTurn = game.currentTurn;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err);
        alert('Something went wrong!');
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
