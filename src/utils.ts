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
