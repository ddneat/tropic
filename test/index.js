const fs = require('fs');
const cp = require('child_process');
const { miniTest, miniTestReport } = require('../util/mini-test')();
const assert = require('assert');

const output = {};
const isHiddenFile = file => file.match(/^\./) !== null;
const files = fs.readdirSync('./test').filter(file => file !== 'index.js' && !isHiddenFile(file));
files.forEach(file => {
  const childArgs = ['./cli', 'test/' + file];
  if (file === 'require.js') {
    childArgs.push('--require=babel-register');
  }
  const child = cp.spawnSync(
    process.argv[0],
    childArgs,
    { stdio: ['pipe', 'pipe', process.stderr] }
  );
  output[file] = String(child.stdout);
});

const extractCount = matches => {
  if (matches && matches.length > 1) {
    console.log('Invalid reporting');
  }
  return matches === null ? null : parseInt(matches[matches.length - 1].match(/\d*/));
};

const passingCount = str => extractCount(str.match(/\d* passing/g));
const failingCount = str => extractCount(str.match(/\d* failing/g));

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

miniTest('require.js has 1 passing test', () => {
  const log = output['require.js'];
  assert.equal(passingCount(log), 1);
});

miniTestReport();
