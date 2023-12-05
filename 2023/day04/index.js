const fs = require("fs");

let data = fs.readFileSync("./input.txt", "utf8").trim().split("\n");
let test = fs.readFileSync("./test.txt", "utf8").trim().split("\n");

function partOne(input) {
  let totalPoints = input.map((line) => {
    const winNums = line.split(":")[1].split("|")[0].match(/\d+/g);
    const myNums = line.split(":")[1].split("|")[1].match(/\d+/g);

    let total;
    myNums.forEach((num) => {
      if (winNums.includes(num)) {
        total = !total ? 1 : total * 2;
      }
    });
    return !total ? 0 : total;
  });
  return totalPoints.reduce((a, b) => a + b);
}

function partTwo(input) {}

console.log("Part One:", partOne(data));
console.log("Part Two:", partTwo(test));
