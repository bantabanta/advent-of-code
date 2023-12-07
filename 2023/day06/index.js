const fs = require("fs");

let data = fs.readFileSync("./input.txt", "utf8").trim().split("\n");
let test = fs.readFileSync("./test.txt", "utf8").trim().split("\n");

function partOne(input) {
  let times = input[0].match(/\d+/g);
  let distances = input[1].match(/\d+/g);

  let wins = times.map((time, index) => {
    let record = distances[index];
    let sum = 0;
    for (let i = 0; i <= time; i++) {
      let distance = i * (time - i);
      if (distance > record) {
        sum++;
      }
    }
    return sum;
  });
  return wins.reduce((a, b) => a * b);
}

function partTwo(input) {
  let time = Number(input[0].match(/\d+/g).join(""));
  let record = Number(input[1].match(/\d+/g).join(""));
  console.log(time, record);

  let sum = 0;
  for (let i = 0; i <= time; i++) {
    let distance = i * (time - i);
    // console.log(distance);
    if (distance > record) {
      sum++;
    }
  }
  return sum;
}

console.log("Part One:", partOne(test));
console.log("Part Two:", partTwo(data));
