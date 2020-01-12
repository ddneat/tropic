# Tropic Test Runner

Tropic offers following features:

- Async testing with async/await, promises or done callback
- Execute certain tests by using `only` and `skip`
- Watchmode
- Colorful logs
- No global variables 
- Isolated test execution
- Transpile/Compile code with e.g.: babel, ES2017
- Lightweight, No additional dependencies

## Contents

- [Example](#example)
- [Usage](#usage)
- [Options](#options)
- [Contribute](#contribute)

## Example

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
test('title async-await', async () => await () => {});
```

## Usage

You can install tropic using npm:

```console
npm install --save-dev tropic
```

After you created your first test file (e.g. `test.spec.js`) you might just run tropic like the following:

```console
tropic **/*.spec.js --watch
```
Usage with babel / ES2019:

```console
npm install @babel/register --save-dev
```

```console
tropic **/*.spec.js --require=@babel/register
```

Note: Please verify that you have a `.babelrc` or babel config within your `package.json.` Also make sure that you have all `plugins/presets` in installed and configured.

## Options

### `--watch`

Starts a watcher for the current directory. On file changes the tests will be automaticly executed again. In case there is already an execution running, the running execution will be canceled. The watcher ignores the `node_modules` directory, dotfiles and hidden directories like `.idea`.

### `--require`

Following an example using `@babel/register`:

```console
tropic **/*.spec.js --require=@babel/register
```

Multiple modules are also supported:

```console
tropic **/*.spec.js --require=@babel/register,./custom-local-script.js
```

# Contribute

- Feel free to open an issue or even a pull request
- To run one single integration test just go for `node cli test/assert`
- Check the `package.json` for further scripts
