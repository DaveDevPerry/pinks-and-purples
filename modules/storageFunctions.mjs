// import { appName } from '../app.js';

export function checkForLocalData(appName){
  console.log('in ls check');
  console.log(appName);
  let sessionDataArray = [];

  if(!localStorage.getItem(appName)){
    console.log('no data');
    // create data
    createFirstLoadData(appName)
  }
  if(localStorage.getItem(appName)){
    // grab data
    console.log('data in ls');
    sessionDataArray = loadGameData(appName)
  }
  console.log(sessionDataArray);
  return sessionDataArray;
}
function loadGameData(appName){
const fromLs = JSON.parse(localStorage.getItem(appName));
console.log(fromLs);
// make a copy 
const sessionDataArray = [...fromLs];
console.log(sessionDataArray);
return sessionDataArray;
}

function createFirstLoadData(appName){
const gameData = [
  {
    name: 'millie',
    color: '$pink',
    shape: 'circle',
    stats: {
      games: 0,
      won: 0,
      drawn: 0,
      lost: 0
    },
    trophyCount: 0
  },
  {
    name: 'robyn',
    color: '$purple',
    shape: 'cross',
    stats: {
      games: 0,
      won: 0,
      drawn: 0,
      lost: 0
    },
    trophyCount: 0
  }
];
console.log(gameData);
console.log(appName);
localStorage.setItem(appName,JSON.stringify(gameData))
}