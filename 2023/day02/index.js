const fs = require("fs");

let data = fs.readFileSync("./input.txt", "utf8").trim().split("\n");
let test = fs.readFileSync("./test.txt", "utf8").trim().split("\n");

function partOne(input) {
  const cubeMap = { red: 12, green: 13, blue: 14 };

  let possibleGames = input.map((line) => {
    let game = Number(line.match(/\d+/)[0]);

    cubePulls = line.split(":")[1].replace(/;/g, ",").split(",");

    let validCount = cubePulls.every((pull) => {
      const count = pull.match(/\d+/);
      const color = pull.split(count)[1].trim();
      return cubeMap[color] >= count;
    });

    return validCount ? game : 0;
  });
  return possibleGames.reduce((a, b) => a + b);
}

console.log("Part One:", partOne(data));

function partTwo(input) {
  let cubePower = input.map((line) => {
    console.log("part two");
  });
}
console.log("Part Two:", partTwo(test));
