export function renderPlayerStats(arr){
const robynData = arr.find(Obj => Obj.name === 'robyn');
const millieData = arr.find(Obj => Obj.name === 'millie');
console.log(robynData);

// millie stats
const millieWinElement = document.querySelector('#millie-stat-win');
millieWinElement.textContent = millieData.stats.won;
const millieDrawElement = document.querySelector('#millie-stat-draw');
millieDrawElement.textContent = millieData.stats.drawn;
const milliePlayedElement = document.querySelector('#millie-stat-played');
milliePlayedElement.textContent = millieData.stats.games;
// millie trophies
console.log(millieData.trophyCount);
getTrophyCount(millieData);
console.log(millieData.trophyCount);
const millieTrophyCount = millieData.trophyCount;
const milliesTrophiesElement = document.querySelectorAll('.millie-star');
milliesTrophiesElement.forEach((star, index)=>{
console.log(star, index);
if(millieTrophyCount > index){
  star.src = "./images/star_on.png"
} else {
  star.src = "./images/star_off.png"
}
})






// robyn stats
const robynWinElement = document.querySelector('#robyn-stat-win');
robynWinElement.textContent = robynData.stats.won;
const robynDrawElement = document.querySelector('#robyn-stat-draw');
robynDrawElement.textContent = robynData.stats.drawn;
const robynPlayedElement = document.querySelector('#robyn-stat-played');
robynPlayedElement.textContent = robynData.stats.games;
// robyn trophies
console.log(robynData.trophyCount);
getTrophyCount(robynData);
console.log(robynData.trophyCount);
const robynTrophyCount = robynData.trophyCount;
const robynsTrophiesElement = document.querySelectorAll('.robyn-star');
robynsTrophiesElement.forEach((star, index)=>{
console.log(star, index);
if(robynTrophyCount > index){
  star.src = "./images/star_on.png"
} else {
  star.src = "./images/star_off.png"
}
})



}

function getTrophyCount(playerData){
  let trophyCount = 0;
console.log(playerData);
// check stats
if(playerData.stats.games >= 250){
trophyCount++;
}
if(playerData.stats.games >= 5){
  trophyCount++;
}
if(playerData.stats.won >= 100){
  trophyCount++;
}
if(playerData.stats.won >= 50){
  trophyCount++;
}
if(playerData.stats.won >= 10){
  trophyCount++;
}
console.log(trophyCount);
playerData.trophyCount = trophyCount;
// return trophyCount;
return
}