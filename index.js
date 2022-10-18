const $ = (id) => document.getElementById(id);
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let xChance = true;
let elements = [0,0,0,0,0,0,0,0,0];
const gridElements = document.querySelectorAll('.gridElement');
const xSpan = "<span class=\"x\">x</span>";
const oSpan = "<span class=\"o\">o</span>";

const startGame = () => {
  gridElements.forEach((item)=> {
    item.innerHTML = '';
  });
  elements = [0,0,0,0,0,0,0,0,0];
  xChance = true;
  $('chance').innerHTML = 'Chance : X' 
  $('resultText').innerHTML = '';
  $('modal').classList.remove('show-modal');
};

startGame();

const checkWin = () => {
  WINNING_COMBINATIONS.forEach((item) => {
    if(elements[item[0]] === elements[item[1]] && elements[item[1]] === elements[item[2]] && (elements[item[1]] === 1 || elements[item[1]] === 2)) {
      $('modal').classList.add('show-modal');
      $('resultText').innerHTML = `${xChance ? 'x' : 'o'} Wins...`;
      return;
    }
  })
};

const checkDraw = () => {
  for(let ele of elements){
    if(ele === 0) return;
  }
  $('modal').classList.add('show-modal');
  $('resultText').innerHTML = 'Draw...';
};

const elementClicked = (index) => {
  let id = parseInt(index) 
  if(elements[id] !== 0) return;
  elements[id] = xChance ? 1 : 2;
  gridElements[id].innerHTML = xChance ? xSpan : oSpan;
  checkWin();
  checkDraw();
  xChance = !xChance;
  $('chance').innerHTML = `Chance : ${xChance ? 'X' : 'O'}` 
}


window.onload= function(){
  $('restartBtn').onclick= startGame;
}
