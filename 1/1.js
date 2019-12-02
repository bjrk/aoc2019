const fs = require("fs").promises;

main();

async function main() {
  try {
    const file = await fs.readFile("example.txt", "utf-8");
    const rows = file.split("\n");
    const sum = rows.reduce((acc, row) => {
      const mass = Number(row);
      console.log(acc, mass);
      return acc + calculateFuel(mass);
    }, 0);
    console.log(sum);
  } catch (e) {
    console.error(e);
  }
}
function calculateFuel(mass) {
  if (mass <= 0) {
    return 0;
  }
  const fuel = Math.max(Math.floor(mass / 3) - 2, 0);
  return fuel + calculateFuel(fuel);
}
