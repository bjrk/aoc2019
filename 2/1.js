const fs = require("fs").promises;

main();

async function main() {
  try {
    const file = await fs.readFile("example.txt", "utf-8");
    console.log(file);
    const positions = file.split(",");
    let j = 0;
    for (let i = 4; i < positions.length; i += 4) {
      const [opcode, first, second, out] = positions.slice(j, i);
      if (opcode == 99) {
        break;
      }
      if (opcode == 1) {
        positions[out] = Number(positions[first]) + Number(positions[second]);
      }
      if (opcode == 2) {
        positions[out] = Number(positions[first]) * Number(positions[second]);
      }
      j = i;
    }
    console.log(positions);
  } catch (e) {
    console.error(e);
  }
}
