const fs = require("fs");

let data = fs.readFileSync("./input.txt", "utf8").trim().split("\n");
let test = fs.readFileSync("./test.txt", "utf8").trim().split("\n");

function partOne(input) {
  let location = input[2],
    end = "ZZZ",
    directions = input[0].split(""),
    steps = 0;

  while (location.slice(0, 3) !== end) {
    directions.forEach((step) => {
      let choices = location
        .match(/\(([^)]+)\)/)[1]
        .split(",")
        .map((el) => el.trim());
      let node = step === "L" ? choices[0] : choices[1];
      location = input.find((line) => line.slice(0, 3) === node);
      steps++;
    });
  }
  return steps;
}

function partTwo(input) {
  let location = input[2],
    steps = 0,
    directions = input[0].split(""),
    starts = input.filter((line) => line[2] === "A");

  const loopStarts = starts.reduce((acc, curr, idx) => {
    let [steps, counter] = [0, 0],
      location = curr;

    while (location[2] !== "Z") {
      if (counter === directions.length) counter = 0;

      let locations = location
        .match(/\(([^)]+)\)/)[1]
        .split(",")
        .map((el) => el.trim());

      const move = directions[counter];
      location = move === "L" ? locations[0] : locations[1];
      location = input
        .slice(2)
        .filter((line) => line.slice(0, 3) === location)[0];

      steps++;
      counter++;
    }

    acc = { ...acc, [curr]: steps };
    return acc;
  }, {});

  console.log(loopStarts);

  const findLCM = (a, b) => {
    const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
    return (a * b) / gcd(a, b);
  };

  const findLCMArray = (arr) => {
    let lcm = arr[0];
    for (let i = 1; i < arr.length; i++) {
      lcm = findLCM(lcm, arr[i]);
    }
    return lcm;
  };

  return findLCMArray(Object.values(loopStarts));
}

console.log("Part One:", partOne(data));
console.log("Part Two:", partTwo(data));
