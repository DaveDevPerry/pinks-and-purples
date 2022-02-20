import {sessionDataArray, gamesPlayed, appName} from '../app.js';
import {renderPlayerStats} from './renderFunctions.mjs';
import {btnAudio, placeCounter,applauseAudio,drawAudio} from './audioFunctions.mjs';
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');
// const restartButton = document.querySelector('#restartBtn');
const winningMessageElement = document.querySelector('#winningMessage');
const winningMessageTextElement = document.querySelector(
	'[data-winning-message-text]'
);
// const endGameBtn = document.querySelector('#end-game-btn');
const endGameBtn = document.querySelectorAll('.end-game-btn');
const restartButton = document.querySelectorAll('.restart-btn')
let circleTurn;

let millieTurn = circleTurn ? true : false;



// endGameBtn.addEventListener('click', saveSessionData);
endGameBtn.forEach((btn)=>{
	btn.addEventListener('click', ()=>{
		// endGameAudio();
		saveSessionData();
	});
})

function saveSessionData(){
  const fromLs = JSON.parse(localStorage.getItem(appName));
  console.log(fromLs);
  console.log(sessionDataArray);
  localStorage.setItem(appName,JSON.stringify(sessionDataArray))
}

// startGame();

// restartButton.addEventListener('click', startGame);
restartButton.forEach((btn)=>{
	btn.addEventListener('click',()=>{
		btnAudio();
		startGame();
	})
})

export function startGame() {
	
  renderPlayerStats(sessionDataArray)
const gamesPlayed = sessionDataArray[0].stats.games;
  console.log(gamesPlayed);
	// nextGo++;
  // console.log(nextGo);
  // console.log(gamesPlayed);
	// gamesPlayed++;
  // console.log(gamesPlayed);
  console.log('start game');
  console.log(sessionDataArray);
  if(gamesPlayed%2){
    circleTurn = true;
		console.log('millie starts')
		const starter = 'millie'
		showStartGameMessages(starter)
  }else{
    circleTurn = false;
		console.log('robyn starts')
		const starter = 'robyn'
		showStartGameMessages(starter)
  }
	// circleTurn = false;
  console.log(circleTurn, millieTurn);
	cellElements.forEach((cell) => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(CIRCLE_CLASS);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, { once: true });
	});
	setBoardHoverClass();
	winningMessageElement.classList.remove('show');
}

// function show

function showStartGameMessages(starter){
	console.log(starter);
	document.querySelector('.starter-message').classList.add('show')
	// const millie
	const startElements = document.querySelectorAll('.starter-element');
	startElements.forEach((element)=>{
		element.classList.remove('show-starter')
		console.log(element.dataset.player);
		if(element.dataset.player === starter){
			element.classList.add('show-starter')
		}
	})

console.log('all starters showing for', starter);



	const beginBtns = document.querySelectorAll('.begin-btn');
	beginBtns.forEach((btn)=>{
		btn.addEventListener('click',()=>{
			btnAudio();
			document.querySelector('.starter-message').classList.remove('show')
		})
	})


	// document.querySelector('.starter-message')
}

function handleClick(e) {
	placeCounter();
	const cell = e.target;
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}

	// check for win
	// check for draw
	// switch turns
}

function endGame(draw) {
	if (draw) {
		drawAudio();
		winningMessageTextElement.innerText = 'Draw!';
		// hide post game player cta and messages
		// document.querySelectorAll('.player-msg-wrapper').forEach((msg)=>{msg.classList.toggle('hide-player')})
		showMessagesIfDraw();
    // add draw to each player
    addDraw()
	} else {
		applauseAudio();
    const winner = circleTurn ? 'millie' : 'robyn';
    const loser = circleTurn ? 'robyn' : 'millie';
		winningMessageTextElement.innerText = `${circleTurn ? "Millie / Pink" : "Robyn / Purple"} Wins!`;
    // add game
    addWin(winner);
    addLoser(loser)
showEndOfGameMessages(winner);
	}
	winningMessageElement.classList.add('show');
}

function showMessagesIfDraw(){
	const statusElements = document.querySelectorAll('.status-element');
	statusElements.forEach((element)=>{
		element.classList.remove('show')
		console.log(element.dataset);
		if(element.dataset.gameOutcome === 'draw'){
			element.classList.add('show');
		}
	})
}

function showEndOfGameMessages(winner){
	const statusElements = document.querySelectorAll('.status-element');
	statusElements.forEach((element)=>{
		element.classList.remove('show')
		console.log(element.dataset);
		if(element.dataset.gameOutcome === winner){
			element.classList.add('show');
		}
	})

}

// function showEndOfGameMessages(winner,loser){
// 	const gameStatusElements = document.querySelectorAll('.game-status')
// 	gameStatusElements.forEach((element)=>{
// 		element.classList.remove('show')
// 	})
// 	const winnerElementsToDisplay = document.querySelectorAll(`.winning-name-${winner}`)
// 	winnerElementsToDisplay.forEach((element)=>{
// 		element.classList.add('show');
// 	})
// 	// const losingElementsToDisplay = document.querySelectorAll('.losing')
// }

function addDraw(){
  sessionDataArray.forEach((player)=>{
    player.stats.drawn++;
    player.stats.games++;
  })
}
function addWin(winner){
const player = sessionDataArray.find(Obj => Obj.name === winner);
player.stats.won++
player.stats.games++
}
function addLoser(loser){
  const player = sessionDataArray.find(Obj => Obj.name === loser);
player.stats.lost++
player.stats.games++
}

function isDraw() {
	return [...cellElements].every((cell) => {
		return (
			cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
		);
	});
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}
let whosTurn = '';
function swapTurns() {
	circleTurn = !circleTurn;
  console.log(circleTurn,millieTurn);
  // show next go
  whosTurn = circleTurn ? 'millie' : 'robyn';
  console.log(whosTurn);
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(CIRCLE_CLASS);
	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS);
    console.log('millies go');
	} else {
		board.classList.add(X_CLASS);
    console.log('robyns go');
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}
