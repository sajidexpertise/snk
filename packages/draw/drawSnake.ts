import { Point } from "./types";

export function drawSnake(points: Point[], options: any) {
  const {
    ctx,
    cellSize,
    snakeColor = "#00ff00", // hacker green
    speed = 3,               // increased speed
    length = 150,            // longer snake
  } = options;

  let snake: Point[] = [];
  let direction = { x: 1, y: 0 };
  let frame = 0;

  function randomDirection() {
    const dirs = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];
    return dirs[Math.floor(Math.random() * dirs.length)];
  }

  return function tick() {
    frame++;
    if (frame % speed === 0) {
      // occasionally randomize movement for hacker vibe
      if (Math.random() < 0.2) {
        direction = randomDirection();
      }

      const head = snake.length
        ? { x: snake[0].x + direction.x, y: snake[0].y + direction.y }
        : { x: 0, y: 0 };

      snake.unshift(head);

      // Limit snake length
      if (snake.length > length) {
        snake.pop();
      }
    }

    // Draw snake
    ctx.fillStyle = snakeColor;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00ff00";
    snake.forEach((p) => {
      ctx.fillRect(p.x * cellSize, p.y * cellSize, cellSize, cellSize);
    });
  };
}
