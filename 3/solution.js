"use strict";
const fs = require("fs");
const input = fs
  .readFileSync("./input")
  .toString("utf-8")
  .trim()
  .split("\n");
console.time("run");
const wires = [];
const dX = { R: 1, L: -1 };
const dY = { U: 1, D: -1 };
input.map((row, num) => {
  let x = 0,
    y = 0,
    steps = 1;
  const wire = new Map();
  wires[num] = wire;
  const commands = row.split(",");
  commands.forEach(command => {
    const [dir, dist] = [command.slice(0, 1), command.slice(1)];
    for (let i = 1; i <= dist; i++ && steps++) {
      x += dX[dir] || 0;
      y += dY[dir] || 0;
      const cKey = "" + x + y;
      !wire.has(cKey) && wire.set(cKey, { x, y, steps });
    }
  });
});
const shortest = [...wires[0].keys()]
  .filter(key => wires[1].has(key))
  .reduce((shortest, key) => {
    const val = wires[0].get(key).steps + wires[1].get(key).steps;
    return !shortest || val < shortest ? val : shortest;
  }, null);
console.log(shortest);

console.timeEnd("run");
