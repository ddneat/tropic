const test = require('../src/tropic');
const assert = require('assert');

test('should pass: assert does not throw', () => {
  assert(true);
});

test('should fail: assert throws', () => {
  assert(false);
});
