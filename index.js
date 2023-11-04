let inputDirection = { x: 0, y: 0 };

let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 10 }];
food = { x: 13, y: 15 };

function main(currTime) {
  window.requestAnimationFrame(main);
  if ((currTime - lastPaintTime) / 1000 < 1 / speed) {
    // console.log(currTime);
    return;
  }
  lastPaintTime = currTime;
  gameEngine();
}
function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}
function gameEngine() {
  //    snake and food
  if (isCollide(snakeArr)) {
    
    inputDirection = { x: 0, y: 0 };
    alert("game over");
    
    snakeArr = [{ x: 13, y: 10 }];
    score = 0;
    scoreBox.innerHTML = "score: " + score;
  }
  // if food eaten
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "Hiscore: " + hiscoreval;
    }
    scoreBox.innerHTML = "score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDirection.x,
      y: snakeArr[0].x + inputDirection.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  // moving snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDirection.x;
  snakeArr[0].y += inputDirection.y;
  // display snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // display food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "Hiscore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDirection = { x: 0, y: 1 };
  switch (e.key) {
    case "ArrowUp":
      // console.log("arrowUP");
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;
    case "ArrowLeft":
      // console.log("arrowl");
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;
    case "ArrowRight":
      // console.log("arrowr");
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;
    case "ArrowDown":
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;
    default:
      break;
  }
});
