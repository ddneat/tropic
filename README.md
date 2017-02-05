# Tropic Thunder Test Runner

```js
const test = require('tropic');
const assert = require('assert');

test('title', () => {
  assert.equal(1 + 2, 3)
});

test.only('title test.only', () => {
  assert.equal(1 + 2, 3)
});

test.skip('title test.skip', () => {
  assert.equal(1 + 2, 3)
});
```
