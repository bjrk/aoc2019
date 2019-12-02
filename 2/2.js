const fs = require("fs").promises;

main();

async function main() {
  try {
    const file = await fs.readFile("example.txt", "utf-8");
    const perPositions = file.split(",");
    let j = 0;
    for (let noun = 0; noun <= 99; noun++) {
      for (let verb = 0; verb <= 99; verb++) {
        const positions = perPositions.slice().map(Number);
        positions[1] = noun;
        positions[2] = verb;
        for (let i = 4; i < positions.length; i += 4) {
          const [opcode, first, second, out] = positions.slice(j, i);
          if (opcode == 99) {
            break;
          }
          if (opcode == 1) {
            positions[out] =
              Number(positions[first]) + Number(positions[second]);
          }
          if (opcode == 2) {
            positions[out] =
              Number(positions[first]) * Number(positions[second]);
          }
          j = i;
        }
        if (positions[0] == 19690720) {
          console.log("found");
          console.log(noun, verb);
          console.log(100 * noun + verb);
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
}
