/**
 * This function will take an id as parameter and returns an HTML Element refering to that id.
 * @param {string} id The id attribute of an HTML Element
 * @returns {HTMLElement | null} Returns a reference to the first object with the specified value of the ID attribute.
 */
const $ = (id) => document.getElementById(id);

/**
 * Holds all the combinations to win tic tac toe
 * @type {number[][]} 
 */
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

/**
 * Tells whose turn it is, X or O
 * @type {boolean}
 */
let xChance = true;

/**
 * Flag that describes if the game has ended
 * @type {boolean}
 */
let gameOver = false;

/**
 * Holds the current value of a grid element.
 * 0 if empty
 * 1 if X
 * 2 if O
 * @type {Array}
 */
let elements = [0,0,0,0,0,0,0,0,0];

/**
 *  Array of reference to all elements of class gridElement
 * @type {HTMLElement[]}
 */
const gridElements = document.querySelectorAll('.gridElement');

/**
 *  span tag that will display X on the webpage
 * @type {string}
 */
const xSpan = "<span class=\"x\">x</span>";

/**
 *  span tag that will display O on the webpage
 * @type {string}
 */
const oSpan = "<span class=\"o\">o</span>";

/**
 * A function to initialize all the global variables when the game is started or reset.
 */
const startGame = () => {
  gridElements.forEach((item)=> {
    item.innerHTML = '';
  });
  elements = [0,0,0,0,0,0,0,0,0];
  xChance = true;
  gameOver = false;
  $('chance').innerHTML = 'Chance : X' 
  $('resultText').innerHTML = '';
  $('modal').classList.remove('show-modal');
};

startGame();

/**
 * Function to check if someone has won the game. Called everytime a gridElement is clicked.
 */
const checkWin = () => {
  WINNING_COMBINATIONS.forEach((item) => {
    if(elements[item[0]] === elements[item[1]] && elements[item[1]] === elements[item[2]] && (elements[item[1]] === 1 || elements[item[1]] === 2)) {
      $('modal').classList.add('show-modal');
      $('resultText').innerHTML = `${xChance ? 'x' : 'o'} Wins...`;
      gameOver = true;
      return;
    }
  })
};

/**
 * Function to check if the game is draw. Called everytime a gridElement is clicked.
 */
const checkDraw = () => {
  for(let ele of elements){
    if(ele === 0) return;
  }
  $('modal').classList.add('show-modal');
  $('resultText').innerHTML = 'Draw...';
};

/**
 * The function that is executed when a grid element is clicked.
 * @param {string} index 
 * @returns {void}
 */
const elementClicked = (index) => {
  let id = parseInt(index) 
  if(elements[id] !== 0) return;
  elements[id] = xChance ? 1 : 2;
  gridElements[id].innerHTML = xChance ? xSpan : oSpan;
  checkWin();
  if(!gameOver) checkDraw();
  xChance = !xChance;
  $('chance').innerHTML = `Chance : ${xChance ? 'X' : 'O'}` 
}


window.onload= function(){
  $('restartBtn').onclick= startGame;
}
