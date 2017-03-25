# Tropic Test Runner

__Tropic might have a bright future, however it still lacks cetrain features which might be useful. Please verify if your needs are already implemented before jumping on the tropic experience.__

Tropic already offers following features:

- Async testing with promises or done callback
- Execute certain tests by using `only` and `skip`
- Watchmode
- Colorful logs

__Check [issue #1](https://github.com/davidspinat/tropic/issues/1) to get an overview on planned features.__

# Contents

- [Example](#example)
- [Usage](#usage)
- [Contribute](#contribute)

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

# Usage

You can install tropic using npm:

```console
npm install --save-dev tropic
```

After you created your first test file (e.g. `test.spec.js`) you might just run tropic like the following:

```console
tropic **/*.spec.js --watch
```

Note: `--watch` is optional.

# Contribute

- Feel free to open an issue or even a pull request
- To run one single integration test just go for `node cli test/assert`
- Check the `package.json` for further scripts
