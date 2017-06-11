const test = require('../src/tropic');
const assert = require('assert');

test.only('should pass: logs to console', () => {
  console.log('puts that one to the console');
  assert(true);
});

test('should fail: logs to console', () => {
  console.log('NOPE that one is not logged');
  assert(false);
});
