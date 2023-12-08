const fs = require("fs");

let data = fs.readFileSync("./input.txt", "utf8").trim().split("\n");
let test = fs.readFileSync("./test.txt", "utf8").trim().split("\n");

function partOne(input) {}

function partTwo(input) {}

console.log("Part One:", partOne(test));
console.log("Part Two:", partTwo(test));
