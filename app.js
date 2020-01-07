let poker = require("./poker");

let randomHand = poker.getRandomHand();
let pickedCardsValues = ["6", "6", "6", "3", "3"]; //randomHand.map(element => element.value);
let pickedCardsSuits = ["trefl", "karo", "pik", "trefl", "karo"]; //randomHand.map(element => element.suite);

console.log(JSON.stringify(pickedCardsValues));
console.log(JSON.stringify(pickedCardsSuits));

poker.checkForHighcard(pickedCardsValues, pickedCardsSuits);
poker.checkForPairs(pickedCardsValues, pickedCardsSuits);
poker.checkForThrees(pickedCardsValues, pickedCardsSuits);
poker.checkForFours(pickedCardsValues, pickedCardsSuits);
poker.checkForDoublePairs(pickedCardsValues, pickedCardsSuits);
poker.checkForFull(pickedCardsValues, pickedCardsSuits);
poker.checkForStraight(pickedCardsValues, pickedCardsSuits);
poker.checkForFlush(pickedCardsValues, pickedCardsSuits);

console.log(JSON.stringify(poker.possiblePokerSets));

let sorted = poker.possiblePokerSets.sort((a, b) => a.order - b.order);
let theBest = sorted[sorted.length - 1];
console.log(theBest);
