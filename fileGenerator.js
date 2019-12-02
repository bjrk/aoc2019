const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const session = require("./session.js");
const day = process.argv[2];

const template = `'use strict';
const fs = require('fs');
const input = fs
  .readFileSync('./input')
  .toString('utf-8')
  .trim()
  .split('\\n')
console.time('run');

console.timeEnd('run')`;

const filesToCreate = [
  {
    filename: `1.js`,
    content: template,
    getData: false
  },
  {
    filename: `2.js`,
    content: template,
    getData: false
  },
  {
    filename: `input`,
    content: "",
    getData: true
  }
];
fs.mkdirSync(`${day}`);
const getInput = async session => {
  const opts = {
    headers: {
      cookie: `session=${session}`
    }
  };
  const result = await fetch(
    `https://adventofcode.com/2019/day/${day}/input`,
    opts
  );
  return await result.text();
};

const createFile = async (filename, content, getData) => {
  if (getData) {
    content = await getInput(session);
  }
  fs.writeFile(path.join(`${day}`, filename), content, "utf8", err => {
    if (err) {
      console.log(err);
    }
    console.log(`file ${filename} was created`);
  });
};

for (let file of filesToCreate) {
  createFile(file.filename, file.content, file.getData);
}
