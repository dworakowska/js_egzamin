var assert = require("assert");
var poker = require("../poker");

describe("Poker", function() {
  beforeEach(function() {
    console.log("Before");
  });

  afterEach(function() {
    console.log("After");
  });
  describe("Straight flush", function() {
    describe("#checkForFlush()", function() {
      it("Possible hand should contain flush", function() {
        let pickedCardsValues = ["7", "8", "9", "10", "J"];
        let pickedCardsSuits = ["karo", "karo", "karo", "karo", "karo"];
        poker.checkForFlush(pickedCardsValues, pickedCardsSuits);
        assert.notEqual(poker.possibleHands.length, 0);
        assert.equal(poker.possibleHands[0].type, "Flush");
      });
    });
  });

  describe("Four of a kind", function() {
    describe("#checkForFours()", function() {
      it("Possible hand should contain four of a kind", function() {
        let pickedCardsValues = ["9", "9", "9", "9", "3"];
        let pickedCardsSuits = ["trefl", "karo", "pik", "kier", "karo"];
        poker.checkForFours(pickedCardsValues, pickedCardsSuits);
        console.log(poker.possibleHands);
        assert.notEqual(poker.possibleHands.length, 0);
        assert.equal(poker.possibleHands[0].type, "Four of Kind");
      });
    });
  });
});
