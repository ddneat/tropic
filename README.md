# Tropic Test Runner

Tropic offers following features which might enhance your testing experience:

- Async testing with promises or done callback
- Execute only certain tests by using `only` and `skip`
- Colorful logs and a reliable watcher
- Works great with `babel`, `sinon` and `power-assert`

# Contents

- Example
- Installation
- ...

# Example

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

test('title done callback', (done) => {});
test('title promise', () => Promise.resolve());
```

# Installation
# Configuration
# Async tests
# Watchmode
# Usage with babel and power-assert

# Contribute

- Feel free to open an issue or even a pull request
- To run one single integration test just go for `node cli test/assert`
- Check the package.json for further scripts
