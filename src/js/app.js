import goblin from '../image/goblin.png';

const scoreNode = document.querySelector('.score span');
const error = document.querySelector('.error span');
const cells = Array.from(document.querySelectorAll('.cell'));
let oldIndex;
let intervalId;
scoreNode.textContent = 0;
error.textContent = 0;

function addGoblin(index) {
  if (oldIndex || oldIndex === 0) {
    cells[oldIndex].innerHTML = '';
  }
  cells[index].innerHTML = `<img src=${goblin}>`;
  oldIndex = index;
}

function getIndex() {
  return Math.floor(Math.random() * cells.length);
}

function startGame() {
  let index = getIndex();
  if (oldIndex === index) {
    do {
      index = getIndex();
    } while (oldIndex === index);
  }
  addGoblin(index);
}
function runInterval() {
  intervalId = setInterval(() => {
    startGame();
  }, 1000);
}

function clicked(e) {
  if (e.currentTarget.innerHTML !== '') {
    scoreNode.textContent = parseInt(scoreNode.textContent, 10) + 1;
    clearInterval(intervalId);
    startGame();
    runInterval();
  } else {
    error.textContent = parseInt(error.textContent, 10) + 1;
    if (parseInt(error.textContent, 10) >= 5) {
      const loseMessage = document.createElement('p');
      loseMessage.textContent = 'вы проиграли';
      document.querySelector('.container').insertAdjacentElement('afterbegin', loseMessage);
      clearInterval(intervalId);
      cells.forEach((cell) => {
        cell.removeEventListener('click', clicked);
      });
    }
  }
}

runInterval();

cells.forEach((cell) => {
  cell.addEventListener('click', clicked);
});
