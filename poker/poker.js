/*
 * Create a solution that will tell us what poker set we have.
 * The solution is to deal us 5 cards from the standard 52 card deck.
 * After that the solution is to tell us what is the best poker set. EXAM
 */

let possiblePokerSets = [];
let cardsValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];
let cardsSuits = ["trefl", "karo", "pik", "kier"]; //koniczyna, czerwony romb, lisc w ksztalcie serca, czerwone serce

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function Card(value, suite) {
  this.value = value;
  this.suite = suite;
}

function Hand(type, cardsArray, order) {
  this.type = type; //nazwa układu pokerowego
  this.cardsArray = cardsArray; //karty w układzie pokerowym
  this.order = order; //kolejność porządkowa, który najlepszy
}

function getRandomHand() {
  let cards = [];

  while (cards.length < 5) {
    let card = new Card(
      cardsValues[getRandomInt(13)],
      cardsSuits[getRandomInt(4)]
    );

    // sprawdzam czy karty powtarzają się
    let found = cards.some(
      item => item.value === card.value && item.suite === card.suite
    );
    if (!found) {
      cards.push(card);
    }
  }
  return cards;
}

function getValueFromId(cardId) {
  // "A_of_pik" => "A"
  let index = cardId.indexOf("_");
  return cardId.slice(0, index);
}

function checkForHighcard(pickedCardsValues, pickedCardsSuits) {
  if (pickedCardsValues.length > 0) {
    let max = 0;
    let highCard = "";

    for (i = 0; i < pickedCardsValues.length; i++) {
      let order = cardsValues.indexOf(pickedCardsValues[i]) + 1;
      if (order > max) {
        max = order;
        highCard = pickedCardsValues[i] + "_of_" + pickedCardsSuits[i];
      }
    }
    let hand = new Hand("High Card", highCard, 0);
    possiblePokerSets.push(hand);
  }
}

function checkForPairs(pickedCardsValues, pickedCardsSuits) {
  if (pickedCardsValues.length > 1) {
    for (i = 0; i < pickedCardsValues.length - 1; i++) {
      for (j = i + 1; j < pickedCardsValues.length; j++) {
        if (pickedCardsValues[i] == pickedCardsValues[j]) {
          let card1 = pickedCardsValues[i] + "_of_" + pickedCardsSuits[i];
          let card2 = pickedCardsValues[j] + "_of_" + pickedCardsSuits[j];
          let hand = new Hand("Pair", [card1, card2], 1);
          possiblePokerSets.push(hand);
        }
      }
    }
  }
}

// Check for ALL possible threes
function checkForThrees(pickedCardsValues, pickedCardsSuits) {
  if (pickedCardsValues.length > 2) {
    for (i = 0; i < pickedCardsValues.length - 2; i++) {
      for (j = i + 1; j < pickedCardsValues.length - 1; j++) {
        if (pickedCardsValues[i] == pickedCardsValues[j]) {
          for (k = j + 1; k < pickedCardsValues.length; k++) {
            if (pickedCardsValues[j] == pickedCardsValues[k]) {
              let card1 = pickedCardsValues[i] + "_of_" + pickedCardsSuits[i];
              let card2 = pickedCardsValues[j] + "_of_" + pickedCardsSuits[j];
              let card3 = pickedCardsValues[k] + "_of_" + pickedCardsSuits[k];
              let hand = new Hand("Three of Kind", [card1, card2, card3], 3);
              possiblePokerSets.push(hand);
            }
          }
        }
      }
    }
  }
}

// Check for four
function checkForFours(pickedCardsValues, pickedCardsSuits) {
  if (pickedCardsValues.length > 3) {
    for (i = 0; i < pickedCardsValues.length - 1; i++) {
      let indexes = [i]; //wartości kart

      for (j = i + 1; j < pickedCardsValues.length; j++) {
        if (pickedCardsValues[i] == pickedCardsValues[j]) {
          indexes.push(j);
        }
      }
      if (indexes.length == 4) {
        let cardsArr = []; //wartosci kart wraz z kolorami
        for (i = 0; i < indexes.length; i++) {
          let card =
            pickedCardsValues[indexes[i]] +
            "_of_" +
            pickedCardsSuits[indexes[i]];
          cardsArr.push(card);
        }
        let hand = new Hand("Four of Kind", cardsArr, 7);
        console.log(hand);
        possiblePokerSets.push(hand);
        break; //zatrzymujemy
      }
    }
  }
}

// Function to check for double pairs. Will not check in threes and fours, only strict double pairs
function checkForDoublePairs() {
  let pairs = [];

  for (i = 0; i < possiblePokerSets.length; i++) {
    if (possiblePokerSets[i].type == "Pair") {
      pairs.push(possiblePokerSets[i].cardsArray); // [Hand, Hand] => [Card, Card, Card]
    }
  }

  if (pairs.length >= 2) {
    for (i = 0; i < pairs.length - 1; i++) {
      for (j = i + 1; j < pairs.length; j++) {
        if (pairs[i][0].charAt(0) != pairs[j][0].charAt(0)) {
          let cards1 = pairs[i];
          let cards2 = pairs[j];
          let doublePairCards = cards1.concat(cards2);

          let hand = new Hand("Double Pair", doublePairCards, 2);
          possiblePokerSets.push(hand);
        }
      }
    }
  }
}

// Function checking for full, only the biggest full is added to possiblehands

function checkForFull() {
  let pairs = [];
  let threes = [];

  for (i = 0; i < possiblePokerSets.length; i++) {
    if (possiblePokerSets[i].type == "Three of Kind") {
      threes.push(possiblePokerSets[i].cardsArray); // Add possible three
    } else if (possiblePokerSets[i].type == "Pair") {
      pairs.push(possiblePokerSets[i].cardsArray);
    }
  }

  if (threes.length == 0 || pairs.length == 0) {
    return;
  }

  let usedThrees = threes[0];
  let usedPairs = pairs[0];

  if (usedThrees.length != 0 && usedPairs.length != 0) {
    let hand = new Hand("Full House", usedThrees.concat(usedPairs), 6);
    possiblePokerSets.push(hand);
  }
}

// Check for highest flush
function checkForFlush(pickedCardsValues, pickedCardsSuits) {
  let list = [];

  // creating list of all picked cards
  for (i = 0; i < pickedCardsValues.length; i++) {
    let suit = pickedCardsSuits[i];
    let value = pickedCardsValues[i];
    let order = cardsValues.indexOf(value) + 1;
    let card = `${value}_of_${suit}`;
    list.push({ card: card, suit: suit, order: order });
  }

  // sorting list by suit
  list.sort(function(a, b) {
    return a.suit < b.suit ? -1 : a.suit == b.suit ? 0 : 1;
  });

  loop1: for (i = 0; i < list.length - 4; i++) {
    let sameSuitList = [list[i]];

    for (j = i + 1; j < list.length; j++) {
      if (list[i].suit == list[j].suit) {
        sameSuitList.push(list[j]);
      }
    }

    if (sameSuitList.length >= 5) {
      sameSuitList.sort(function(a, b) {
        return a.order > b.order ? -1 : a.order == b.order ? 0 : 1;
      });

      let cards = [];
      for (k = 0; k < 5; k++) {
        cards.push(sameSuitList[k].card);
      }

      let hand = new Hand("Flush", cards, 5);
      possiblePokerSets.push(hand);

      break loop1;
    }
  }
}

// Check for highest straight and for flush straight/royal flush
function checkForStraight(pickedCardsValues, pickedCardsSuits) {
  let list = [];
  let highestStraightAdded = false;
  let highestStraightFlushAdded = false;

  if (pickedCardsValues.length >= 5) {
    for (i = 0; i < pickedCardsValues.length; i++) {
      let value = pickedCardsValues[i];
      let order = cardsValues.indexOf(value);
      let suit = pickedCardsSuits[i];

      let card = `${value}_of_${suit}`;
      list.push({ card: card, order: order + 1, suit: suit });
      // Adding additional order for Ace as this card can be last and first in straight
      if (value == "A") {
        list.push({ card: card, order: 0 });
      }
    }
  }
  // Sorting by order
  list.sort(function(a, b) {
    return a.order > b.order ? -1 : a.order == b.order ? 0 : 1;
  });

  loop2: for (i = 0; i < list.length - 4; i++) {
    let orderMove = 1;

    for (j = i + 1; j < i + 5; j++) {
      if (list[i].order != list[j].order + orderMove) {
        continue loop2;
      } else {
        orderMove++;
      }
    }
    if (orderMove == 5) {
      //5 Cards found, straight
      let cards = [];
      let suits = [];

      for (k = i; k < i + 5; k++) {
        cards.push(list[k].card);
        suits.push(list[k].suit);
      }

      //Checking if highest straight was added. Highest will always be first as list is sorted
      if (highestStraightAdded === false) {
        let hand = new Hand("Straight", cards, 4);
        possiblePokerSets.push(hand);
        highestStraightAdded = true;
      }

      //Checking if found straight is also flush (straight flush)
      let suitCount = 1;
      let cards2 = [cards[0]];

      for (i = 1; i < suits.length; i++) {
        if (suits[0] == suits[i]) {
          suitCount = suitCount + 1;
          cards2.push(cards[i]);
        }
      }
      if (suitCount == 5 && highestStraightFlushAdded === false) {
        let name = "";
        let highestCard = getValueFromId(cards2[0]);
        let order;
        if (highestCard == "A") {
          name = "Royal Flush";
          order = 9;
        } else {
          name = "Straight Flush";
          order = 8;
        }

        let hand2 = new Hand(name, cards2, order);
        possiblePokerSets.push(hand2);
        highestStraightFlushAdded = true;
      }
    }
  }
}

module.exports.checkForHighcard = checkForHighcard;
module.exports.checkForPairs = checkForPairs;
module.exports.checkForThrees = checkForThrees;
module.exports.checkForFours = checkForFours;
module.exports.checkForDoublePairs = checkForDoublePairs;
module.exports.checkForFull = checkForFull;
module.exports.checkForStraight = checkForStraight;
module.exports.checkForFlush = checkForFlush;
module.exports.possiblePokerSets = possiblePokerSets;
module.exports.getRandomHand = getRandomHand;
