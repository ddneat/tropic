const { miniTest, miniTestReport } = require('../util/mini-test')();
const createTest = require('./test');
const assert = require('assert');

const createState = () => {
  const state = { only: [], skip: [], test: [] };
  const addTest = (test) => state.test.push(test);
  const addTestWithOnly = (test) => state.only.push(test);
  const addTestWithSkip = (test) => state.skip.push(test);
  return { state, addTest, addTestWithOnly, addTestWithSkip };
};

miniTest('test adds to state.test', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test('title', function () {
  });
  assert.equal(state.test.length, 1);
});

miniTest('test does not add to state.only', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test('title', function () {
  });
  assert.equal(state.only.length, 0);
});

miniTest('test does not add to state.skip', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test('title', function () {
  });
  assert.equal(state.skip.length, 0);
});

miniTest('only adds to state.only', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.only('title', function () {
  });
  assert.equal(state.only.length, 1);
});

miniTest('only does not add to state.test', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.only('title', function () {
  });
  assert.equal(state.test.length, 0);
});

miniTest('only does not add to state.skip', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.only('title', function () {
  });
  assert.equal(state.test.length, 0);
});

miniTest('skip adds to state.skip', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.skip('title', function () {
  });
  assert.equal(state.skip.length, 1);
});

miniTest('skip does not add to state.test', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.skip('title', function () {
  });
  assert.equal(state.test.length, 0);
});

miniTest('skip does not add to state.only', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.only('title', function () {
  });
  assert.equal(state.only.length, 1);
});

miniTest('test.only.skip adds to state.skip', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.only.skip('title', function () {
  });
  assert.equal(state.skip.length, 1);
});

miniTest('test.only.skip does not add to state.only', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.only.skip('title', function () {
  });
  assert.equal(state.only.length, 0);
});

miniTest('test.only.skip.only adds to state.skip', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.only.skip.only('title', function () {
  });
  assert.equal(state.only.length, 1);
});

miniTest('test.only.skip.only does not add to state.skip', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.only.skip.only('title', function () {
  });
  assert.equal(state.skip.length, 0);
});

miniTest('test.skip.only adds to state.only', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.skip.only('title', function () {
  });
  assert.equal(state.only.length, 1);
});

miniTest('test.skip.only does not add to state.skip', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.skip.only('title', function () {
  });
  assert.equal(state.skip.length, 0);
});

miniTest('test.skip.only.skip adds to state.skip', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.skip.only.skip('title', function () {
  });
  assert.equal(state.skip.length, 1);
});

miniTest('test.skip.only.skip does not add to state.only', () => {
  const { state, addTest, addTestWithOnly, addTestWithSkip } = createState();
  const test = createTest(addTest, addTestWithOnly, addTestWithSkip);
  test.skip.only.skip('title', function () {
  });
  assert.equal(state.only.length, 0);
});

miniTestReport();
