const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;

let snake;
let food;
let score;
let direction;
let game;

function startGame() {
  // Reset game state
  snake = [{ x: 9 * box, y: 10 * box }];
  food = randomFoodPosition();
  score = 0;
  direction = "RIGHT";

  if (game) clearInterval(game);
  game = setInterval(draw, 150);
}

function randomFoodPosition() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box,
  };
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.key;
  if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Snake head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Move snake
  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Eat food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = randomFoodPosition();
  } else {
    snake.pop();
  }

  // Game Over
  if (
    snakeX < 0 || snakeX >= canvasSize ||
    snakeY < 0 || snakeY >= canvasSize ||
    isCollision(snakeX, snakeY, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
    return;
  }

  // Add new head
  const newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);
}

function isCollision(x, y, array) {
  return array.some(segment => segment.x === x && segment.y === y);
}

// Restart button listener
document.getElementById("restartBtn").addEventListener("click", startGame);

// Start game on load
startGame();
