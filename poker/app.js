let poker = require("./poker");

let randomHand = poker.getRandomHand();
let pickedCardsValues = randomHand.map(element => element.value); //["7", "7", "7", "10", "10"]
let pickedCardsSuits = randomHand.map(element => element.suite); // ["trefl", "pik", "karo", "trefl", "kier"]

console.log("Wylosowano:");
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

console.log(`Mozliwe uklady: ${JSON.stringify(poker.possiblePokerSets)}`);

let sorted = poker.possiblePokerSets.sort((a, b) => a.order - b.order); //
let theBest = sorted[sorted.length - 1]; // last
console.log(`Najlepszy set: ${JSON.stringify(theBest)}`);
