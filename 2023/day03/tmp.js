// const { eachMatrix, eachSurrounding, sum } = require("../lib");
const fs = require("fs");
let inputs = fs.readFileSync("./input.txt", "utf8").trim().split("\n");

const eachMatrix = (matrix, eachFn) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      eachFn(matrix[y][x], [x, y], matrix);
    }
  }
};

const hasProp = (val, prop) => {
  if (val == null) {
    return false;
  }

  return hasOwnProperty.call(val, prop);
};

const sum = (nums) => nums.reduce((total, num) => total + num, 0);

const callAtCoords = (matrix, coords, callFn) => {
  const [x, y] = coords;

  if (hasProp(matrix, y) && hasProp(matrix[y], x)) {
    callFn(matrix[y][x], coords, matrix);
  }
};

const eachSurrounding = (matrix, [x, y], eachFn) => {
  callAtCoords(matrix, [x, y - 1], eachFn);
  callAtCoords(matrix, [x + 1, y - 1], eachFn);
  callAtCoords(matrix, [x + 1, y], eachFn);
  callAtCoords(matrix, [x + 1, y + 1], eachFn);
  callAtCoords(matrix, [x, y + 1], eachFn);
  callAtCoords(matrix, [x - 1, y + 1], eachFn);
  callAtCoords(matrix, [x - 1, y], eachFn);
  callAtCoords(matrix, [x - 1, y - 1], eachFn);
};

const isDigit = (char) => /[0-9]/.test(char);
const isSymbol = (char) => char !== "." && !isDigit(char);

const extractPartNumber = (schematics, [x, y]) => {
  let number = "";
  let pos = x;

  while (isDigit(schematics[y][pos])) {
    pos -= 1;
  }

  // pos will end up one too small
  pos += 1;

  while (isDigit(schematics[y][pos])) {
    number += schematics[y][pos];
    schematics[y][pos] = "X"; // Prevent counting numbers twice
    pos += 1;
  }

  return Number(number);
};

const schematic = inputs.map((line) => line.split(""));
const parts = [];

eachMatrix(schematic, (char, coords) => {
  if (isSymbol(char)) {
    eachSurrounding(schematic, coords, (adj, adjCoords) => {
      if (isDigit(adj)) {
        parts.push(extractPartNumber(schematic, adjCoords));
      }
    });
  }
});

console.log(sum(parts));
return sum(parts);
