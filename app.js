import { checkForLocalData } from './modules/storageFunctions.mjs';
import { renderPlayerStats } from './modules/renderFunctions.mjs';
import { startGame } from './modules/gameLogic.mjs';
import { btnAudio } from './modules/audioFunctions.mjs';

export const appName = 'pandp';
export let sessionDataArray = [];
export let gamesPlayed = 0;

window.addEventListener('load', () => {
	sessionDataArray = checkForLocalData(appName);
	console.log(sessionDataArray);
	// load player stats
	renderPlayerStats(sessionDataArray);
	// count totalGamesPlayed to determine next turn
	countGamesPlayed(sessionDataArray);
});

function countGamesPlayed(arr) {
	// dont need forEach
	console.log(arr);
	// gamesPlayed += player.stats.games;
	gamesPlayed = arr[0].stats.games;
	console.log(gamesPlayed);
}

const navBtns = document.querySelectorAll('.button');

navBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		btnAudio();
		const pageToRender = e.target.dataset.pageName;

		console.log(pageToRender);
		renderPage(pageToRender);
	});
});
function renderPage(pageToRender) {
	const pages = document.querySelectorAll('.page');
	pages.forEach((page) => {
		page.classList.remove('page-active');
	});
	document.querySelector(`.${pageToRender}`).classList.add('page-active');
}

const newGameBtn = document.querySelector('#new-game-btn');
newGameBtn.addEventListener('click', () => {
	btnAudio();
	startGame();
});
