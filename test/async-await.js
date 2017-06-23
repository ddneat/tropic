const test = require('../src/tropic');
const assert = require('assert');

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('should pass: async await', async () => {
  await timeout(1);
  assert(true);
});

test('should fail: async await', async () => {
  await timeout(1);
  assert(false);
});

test('should fail: very slow', async () => {
  await timeout(50);
  assert(true);
});
