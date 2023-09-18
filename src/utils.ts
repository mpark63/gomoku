export const getApiUrl = (): string => {
  return window.location.href.includes('http://localhost')
    ? 'http://localhost:4567'
    : 'https://gomoku-api.onrender.com';
};

export const drawHorizLine = (
  ctx: CanvasRenderingContext2D,
  startY: number
) => {
  ctx.moveTo(30, startY);
  ctx.lineTo(570, startY);
  ctx.strokeStyle = '#814141';
  ctx.stroke();
};

export const drawVerticLine = (
  ctx: CanvasRenderingContext2D,
  startX: number
) => {
  ctx.moveTo(startX, 30);
  ctx.lineTo(startX, 570);
  ctx.strokeStyle = '#814141';
  ctx.stroke();
};

export const drawDot = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  ctx.beginPath();
  ctx.arc(x * 30, y * 30, 5, 0, 2 * Math.PI);
  ctx.fillStyle = '#814141';
  ctx.fill();
  ctx.closePath();
};

export const drawPiece = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
) => {
  ctx.beginPath();
  ctx.arc(x * 30 + 30, y * 30 + 30, 14, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

export const checkGameOver = (
  board: string[][],
  newX: number,
  newY: number
) => {
  const startX = newX - 4 < 0 ? 0 : newX - 4;
  const startY = newY - 4 < 0 ? 0 : newY - 4;
  const endX = newX + 4 > 18 ? 18 : newX + 4;
  const endY = newY + 4 > 18 ? 18 : newY + 4;

  // horizantal check
  let y = newY;
  let count = 0;
  let color = '';
  for (let x = startX; x <= endX; x++) {
    if (board[x][y] === '') {
      count = 0;
      color = '';
    } else if (color === board[x][y]) {
      count++;
    } else {
      count = 1;
      color = board[x][y];
    }
    if (count >= 5) {
      return true;
    }
  }

  // vertical check
  let x = newX;
  count = 0;
  color = '';
  for (let y = startY; y <= endY; y++) {
    if (board[x][y] === '') {
      count = 0;
      color = '';
    } else if (color === board[x][y]) {
      count++;
    } else {
      count = 1;
      color = board[x][y];
    }
    if (count >= 5) {
      return true;
    }
  }

  // diagonal check
  y = startY;
  x = startX;
  count = 0;
  color = '';
  while (y <= endY && x <= endX) {
    if (board[x][y] === '') {
      count = 0;
      color = '';
    } else if (color === board[x][y]) {
      count++;
    } else {
      count = 1;
      color = board[x][y];
    }
    x++;
    y++;
    if (count >= 5) {
      return true;
    }
  }

  // diagonal check
  y = endY;
  x = startX;
  count = 0;
  while (y >= startX && x <= endX) {
    if (board[x][y] === '') {
      count = 0;
      color = '';
    } else if (color === board[x][y]) {
      count++;
    } else {
      count = 1;
      color = board[x][y];
    }
    x++;
    y--;
    if (count >= 5) {
      return true;
    }
  }

  return false;
};

export const drawBoard = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  positions: string[][]
) => {
  // clear current canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw lines for board
  for (let i = 30; i <= 570; i += 30) {
    ctx.beginPath();
    drawHorizLine(ctx, i);
    drawVerticLine(ctx, i);
    ctx.closePath();
  }

  // draw reference dots
  for (let i = 4; i <= 16; i += 6) {
    for (let j = 4; j <= 16; j += 6) {
      drawDot(ctx, i, j);
    }
  }

  // draw pieces
  for (let i = 0; i < 19; i++) {
    for (let j = 0; j < 19; j++) {
      if (positions[i][j] !== '') {
        drawPiece(ctx, i, j, positions[i][j]);
      }
    }
  }
};
