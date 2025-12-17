const snakeBodyInit = [
  { x: 4, y: 2 }, // cabeza
  { x: 3, y: 2 }, // cuerpo
  { x: 2, y: 2 }, // cuerpo
  { x: 1, y: 2 }, // cola
];
const initSpeed = 450;

let snakeArr = [...snakeBodyInit];

let foodArr = [{ x: 5, y: 5 }];

let eat = false;
let foodPosition = 5;
let idInterval = 0;
let speed = initSpeed;
let movement = '';

function example() {
  const tablero = document.getElementById('tablero');

  if(!tablero) return;

  tablero.innerHTML = ''; // limpia todo

  createFood();

  snakeArr.forEach((segmento, index) => {
    let type = 'snake';
    if (index === 0) {
      type = 'head';
    }

    printOnTable(segmento.x, segmento.y, type);
  });
}

function printOnTable(x, y, type) {
  let div = document.createElement('div');
  div.id = `${x},${y}`;
  div.classList.add('celda');

  if (type === 'head') {
    div.style.background = 'black';
  } else if (type === 'food') {
    div.style.background = 'red';
  } else {
    div.style.background = 'green';
  }

  div.style.gridColumn = x + 1; // grid empieza en 1
  div.style.gridRow = y + 1;
  document.getElementById('tablero').appendChild(div);
}

function randomNumber() {
  let min = 1;
  let max = 9;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createFood() {
  if (foodArr.length <= 0) {
    let equalCoordinates = false;
    let value = 0;

    do {
      value = randomNumber();
      equalCoordinates = !snakeArr.some((e) => e.x === value && e.y === value);
    } while (!equalCoordinates);

    foodArr.push({
      x: value,
      y: value,
    });
  }

  printOnTable(foodArr[0].x, foodArr[0].y, 'food');
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowDown') {
    if (movement === 'up') return;
    movement = 'down';
    clearInterval(idInterval);
    idInterval = setInterval(() => {
      checkEat();
      downMovment();
      isAlive();
    }, speed);
  }

  if (event.code === 'ArrowRight') {
    if (movement === 'left') return;
    movement = 'right';
    clearInterval(idInterval);
    idInterval = setInterval(() => {
      checkEat();
      rightFromDownMovment();
      isAlive();
    }, speed);
  }

  if (event.code === 'ArrowLeft') {
    if (movement === 'right') return;
    movement = 'left';
    clearInterval(idInterval);
    idInterval = setInterval(() => {
      checkEat();
      leftFromDownMovment();
      isAlive();
    }, speed);
  }

  if (event.code === 'ArrowUp') {
    if (movement === 'down') return;
    movement = 'up';
    clearInterval(idInterval);
    idInterval = setInterval(() => {
      checkEat();
      upMovment();
      isAlive();
    }, speed);
  }
});

function downMovment() {
  snakeArr.pop();
  snakeArr.unshift({
    x: snakeArr[0].x,
    y: snakeArr[0].y + 1,
  });

  example();
}

function rightFromDownMovment() {
  snakeArr.pop();
  snakeArr.unshift({
    x: snakeArr[0].x + 1,
    y: snakeArr[0].y,
  });

  example();
}

function leftFromDownMovment() {
  snakeArr.pop();
  snakeArr.unshift({
    x: snakeArr[0].x - 1,
    y: snakeArr[0].y,
  });
  example();
}

function upMovment() {
  snakeArr.pop();
  snakeArr.unshift({
    x: snakeArr[0].x,
    y: snakeArr[0].y - 1,
  });

  example();
}

function isAlive() {
  if (
    snakeArr[0].x > 9 ||
    snakeArr[0].y > 9 ||
    snakeArr[0].x < 0 ||
    snakeArr[0].y < 0
  ) {
    reset();
    example();
    return false;
  }

  const duplicates = snakeArr.filter(
    (e) => e.x === snakeArr[0].x && e.y === snakeArr[0].y
  );
  if (duplicates.length > 1) {
    reset();
    example();
    return false;
  }

  return true;
}

function reset() {
  window.alert('¡Perdiste!');
  clearInterval(idInterval);
  speed = initSpeed;
  snakeArr = [...snakeBodyInit];
  foodArr = [{ x: 5, y: 5 }];

  example();
}

function checkEat() {
  const { x: xSnakePosition, y: ySnakePosition } = snakeArr[0];
  const [{ x: xFoodPosition, y: yFoodPosition }] = foodArr;

  if (xSnakePosition === xFoodPosition && ySnakePosition === yFoodPosition) {
    eat = true;

    if (speed > 100) {
      speed = speed - 50;
    }
    foodArr = [];
    createFood();
    addToBodySnake();
  }
}

function addToBodySnake() {
  const cola = snakeArr[snakeArr.length - 1];
  snakeArr.push(cola);
}

window.alert('Presiona la flecha derecha para iniciar.');
example();
createFood();
