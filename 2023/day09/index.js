const fs = require("fs");

let data = fs.readFileSync("./input.txt", "utf8").trim().split("\n");
let test = fs.readFileSync("./test.txt", "utf8").trim().split("\n");

const getDiffs = (arr) => {
  return arr.reduce((diffs, num, idx, array) => {
    if (idx > 0) diffs.push(num - array[idx - 1]);
    return diffs;
  }, []);
};

const findNext = (array, part) => {
  let placeholder,
    nextInSequence,
    nextPlaceholder = 0,
    reverseArr = array.reverse();

  reverseArr.forEach((_, idx) => {
    placeholder = nextPlaceholder;
    if (idx === reverseArr.length - 1) return (nextInSequence = placeholder);
    nextArr = reverseArr[idx + 1];
    nextPlaceholder =
      part === "P1"
        ? placeholder + nextArr[nextArr.length - 1]
        : (nextPlaceholder = nextArr[0] - placeholder);
  });

  return nextInSequence;
};

const solution = (input, part) => {
  let nextInSequences = input.map((line) => {
    let mainArray = [line.split(" ").map((x) => Number(x))],
      sequence = mainArray[mainArray.length - 1],
      alike = (arr) => arr.every((x) => x === arr[0]);

    while (!alike(sequence) || sequence[0] !== 0) {
      sequence = getDiffs(sequence);
      mainArray.push(sequence);
    }

    return findNext(mainArray, part);
  });

  return nextInSequences.reduce((a, b) => a + b);
};

console.log("Part One:", solution(data, "P1"));
console.log("Part Two:", solution(data, "P2"));
