'use strict';
const fs = require('fs');
const input = fs
  .readFileSync('./input3')
  .toString('utf-8')
  .trim()
  .split('\n')
console.time('run');

console.timeEnd('run')