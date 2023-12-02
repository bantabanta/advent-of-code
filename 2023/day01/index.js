const fs = require("fs");
const { log } = require("console");

let data = fs.readFileSync("./input.txt", "utf8").trim().split("\n");
let test = fs.readFileSync("./test.txt", "utf8").trim().split("\n");

function partOne(input) {
  let digits = input.map((line) => {
    let allNums = line.replace(/\D/g, "");

    allNums > 1
      ? (result = allNums[0] + allNums.slice(-1))
      : (result = allNums[0] + allNums[0]);

    return Number(result);
  });

  return digits.reduce((a, b) => a + b);
}

log("Part One Calibration:", partOne(data));

function partTwo(input) {
  const regexp = /(?:\d|one|two|three|four|five|six|seven|eight|nine)/g;
  const revRegexp = /(?:\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g;
  const reverseStr = (str) => str.split("").reverse().join("");

  const words = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  let digits = input.map((line) => {
    let first, last;

    const frontMatch = line.match(regexp);
    first = words[frontMatch[0]] || frontMatch[0];

    const backMatch = reverseStr(line).match(revRegexp);
    !Number(backMatch[0])
      ? (last = words[reverseStr(backMatch[0])])
      : (last = backMatch[0]);

    return Number(`${first}${last}`);
  });
  return digits.reduce((a, b) => a + b);
}

log("Part Two Calibration:", partTwo(data));
