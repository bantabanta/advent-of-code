const fs = require("fs");

let data = fs.readFileSync("./input.txt", "utf8").trim().split("\n");
let test = fs.readFileSync("./test.txt", "utf8").trim().split("\n");

function partOne(input) {
  let symbolMap = {};

  input.forEach((line, index) => {
    let syms = line.match(/[^a-zA-Z0-9.\s]/g);

    let symsIndex = syms ? syms.map((symbol) => line.indexOf(symbol)) : [];
    symbolMap[index] = symsIndex;
    // if (syms) {
    //   symsIndex = syms.map((symbol) => line.indexOf(symbol));
    //   symbolMap[index] = symsIndex;
    // } else {
    //   symbolMap[index] = [];
    // }
  });

  let parts = input.map((line, index) => {
    let nums = line.match(/\d+/g);
    console.log("nums line", index, nums);

    if (nums) {
      validParts = nums.map((num) => {
        const inRange = (arr) => {
          const low = line.indexOf(num) - 1;
          const high = line.indexOf(num) + num.length;
          return arr.some((num) => num >= low && num <= high);
        };

        if (index === 0) {
          if (inRange(symbolMap[index]) || inRange(symbolMap[index + 1])) {
            return parseInt(num);
          } else {
            return 0;
          }
        } else if (index === input.length - 1) {
          if (inRange(symbolMap[index]) || inRange(symbolMap[index - 1])) {
            return parseInt(num);
          } else {
            return 0;
          }
        } else {
          if (
            inRange(symbolMap[index]) ||
            inRange(symbolMap[index - 1]) ||
            inRange(symbolMap[index + 1])
          ) {
            return parseInt(num);
          } else {
            console.log(symbolMap[index - 1]);
            return 0;
          }
        }
      });
    }

    // console.log("valid parts", index, validParts, "\n");
    return !nums ? 0 : validParts.reduce((a, b) => a + b);
    let result = !nums ? 0 : validParts.reduce((a, b) => a + b);
    validParts = [];
    return result;
  });
  return parts.reduce((a, b) => a + b);
}

function partTwo(input) {}

console.log("Part One:", partOne(test));
console.log("Part Two:", partTwo(test));
