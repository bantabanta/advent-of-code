const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf8").trim().split("\n");
const test = fs.readFileSync("./test.txt", "utf8").trim().split("\n");

// create an array to get card values
const cardValP1 = "23456789TJQKA".split("");
const cardValP2 = "J23456789TQKA".split("");

// create empty arrays for each hand type
let [high, one, two, three, full, four, five] = Array.from(
  { length: 7 },
  () => []
);

// helper func: find highest count of dupe elements in an array
const maxDupe = (arr) =>
  Math.max(
    ...Object.values(
      arr.reduce((count, el) => {
        count[el] = (count[el] || 0) + 1;
        return count;
      }, {})
    )
  );

// sort hands into hand types
const sortP1 = (hand) => {
  let cards = hand.split("");
  let cardSet = new Set(cards).size;

  cardSet === 1 ? five.push(hand) : "";
  cardSet === 4 ? one.push(hand) : "";
  cardSet === 5 ? high.push(hand) : "";

  if (cardSet === 3) {
    maxDupe(cards) === 3 ? three.push(hand) : two.push(hand);
  }
  if (cardSet === 2) {
    maxDupe(cards) === 4 ? four.push(hand) : full.push(hand);
  }
};

const sortP2 = (hand) => {
  let cards = hand.split("");
  let cardSet = new Set(cards).size;

  let jokers = cards.filter((card) => card === "J").length;
  jokers = jokers > 0 ? jokers : false;

  cardSet === 1 ? five.push(hand) : undefined;
  cardSet === 5 ? (jokers ? one.push(hand) : high.push(hand)) : undefined;
  cardSet === 4 ? (jokers ? three.push(hand) : one.push(hand)) : undefined;

  if (cardSet === 3) {
    maxDupe(cards) === 3
      ? jokers
        ? four.push(hand)
        : three.push(hand)
      : jokers
      ? jokers > 1
        ? four.push(hand)
        : full.push(hand)
      : two.push(hand);
  }

  if (cardSet === 2) {
    maxDupe(cards) === 4
      ? jokers
        ? five.push(hand)
        : four.push(hand)
      : jokers
      ? five.push(hand)
      : full.push(hand);
  }
};

function camelCards(input, sortFn, cardVal) {
  input.forEach((line) => {
    sortFn(line.split(" ")[0]);
  });

  let handTypes = Array.from([high, one, two, three, full, four, five]);

  // sort each array type by card values
  let sortedTypes = handTypes.map((type) => {
    let values = type.map((hand) =>
      hand.split("").map((card) => cardVal.indexOf(card))
    );

    let sortedValues = values.sort((a, b) => {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return a[i] - b[i];
        }
      }
    });

    sortedValues = sortedValues.map((hand) =>
      hand.map((card) => cardVal[card]).join("")
    );

    return sortedValues;
  });

  let sortedByType = sortedTypes.flat();

  // multipy bid values of original lines by the index + 1 of the sorted Array
  let sum = 0;
  sortedByType.forEach((hand) => {
    input.forEach((line) => {
      if (line.includes(hand)) {
        let bid = Number(line.split(" ")[1]);
        sum += bid * (sortedByType.indexOf(line.split(" ")[0]) + 1);
      }
    });
  });

  // empty the arrays for part two
  high.length =
    one.length =
    two.length =
    three.length =
    full.length =
    four.length =
    five.length =
      0;
  return sum;
}

console.log("Part One:", camelCards(data, sortP1, cardValP1));
console.log("Part Two:", camelCards(data, sortP2, cardValP2));
