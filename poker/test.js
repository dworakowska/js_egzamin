function Card(suit) {
  this.suit = suit;
}

let list = [new Card("z"), new Card("a"), new Card("w")];

list.sort(function(a, b) {
  return a.suit < b.suit ? -1 : a.suit == b.suit ? 0 : 1;
});

console.log(JSON.stringify(list));

let list1 = ["z", "a", "w"];
list1.sort();

console.log(JSON.stringify(list1));
