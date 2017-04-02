const { miniTest, miniTestReport } = require('../util/mini-test')();
const { passingCount, failingCount, runFiles, runDirectories } = require('./helper');
const assert = require('assert');

runDirectories(['require']);

const files = [
  {
    path: 'assert.js',
    args: []
  }, {
    path: 'done.js',
    args: []
  }, {
    path: 'promise.js',
    args: []
  }, {
    path: 'skip.js',
    args: []
  }
];

const output = runFiles(files, './test');

miniTest('assert.js has 1 passing test', () => {
  const log = output['assert.js'];
  assert.equal(passingCount(log), 1);
});

miniTest('assert.js has 1 failing test', () => {
  const log = output['assert.js'];
  assert.equal(failingCount(log), 1);
});

miniTest('skip.js has 0 passing test', () => {
  const log = output['skip.js'];
  assert.equal(passingCount(log), 0);
});

miniTest('skip.js has no match for failing', () => {
  const log = output['skip.js'];
  assert.equal(failingCount(log), null);
});

miniTest('done.js has 2 passing test', () => {
  const log = output['done.js'];
  assert.equal(passingCount(log), 2);
});

miniTest('done.js has 4 failing test', () => {
  const log = output['done.js'];
  assert.equal(failingCount(log), 4);
});

miniTest('promise.js has 2 passing test', () => {
  const log = output['promise.js'];
  assert.equal(passingCount(log), 2);
});

miniTest('promise.js has 4 failing test', () => {
  const log = output['promise.js'];
  assert.equal(failingCount(log), 4);
});

miniTestReport();
