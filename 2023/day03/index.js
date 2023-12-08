const fs = require("fs");

let data = fs.readFileSync("./input.txt", "utf8").trim().split("\n");
let test = fs.readFileSync("./test.txt", "utf8").trim().split("\n");
let myArr = [];
function partOne(input) {
  let symbolMap = {};

  input.forEach((line, index) => {
    symbolMap[index] = [];
    const regex = /[^a-zA-Z0-9.\s]/g;
    let match;
    while ((match = regex.exec(line)) !== null) {
      console.log(typeof match);
      symbolMap[index].push(match.index);
    }
  });
  console.log(symbolMap);
  return;

  let parts = input.map((line, index) => {
    let nums = line.match(/\d+/g);

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
            return 0;
          }
        }
      });
    }

    console.log(index + 1, validParts);
    return !nums ? 0 : validParts.reduce((a, b) => a + b);
    if (nums) {
      myArr.push(validParts);
    }
    let result = !nums ? 0 : validParts.reduce((a, b) => a + b);
    validParts = [];
    return result;
  });

  return parts.reduce((a, b) => a + b);
}

function partTwo(input) {}

console.log("Part One:", partOne(test));
console.log("Part Two:", partTwo(test));
