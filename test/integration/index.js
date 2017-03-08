const fs = require('fs');
const cp = require('child_process');
const { miniTest, miniTestReport } = require('../../mini-test')();
const assert = require('assert');

const output = {};
const files = fs.readdirSync('./test/integration').filter(file => file !== 'index.js');
files.forEach(file => {
  const child = cp.spawnSync(process.argv[0], ['./cli.js', 'test/integration/' + file], { stdio: 'pipe' });
  output[file] = String(child.stdout);
});

miniTest('assert.js has 1 passing test', () => {
  const match = output['assert.js'].match('1 passing');
  assert.equal(match.length, 1);
});

miniTest('assert.js has 1 failing test', () => {
  const match = output['assert.js'].match('1 failing');
  assert.equal(match.length, 1);
});

miniTest('skip.js has 0 passing test', () => {
  const match = output['skip.js'].match('0 passing');
  assert.equal(match.length, 1);
});

miniTest('skip.js has no match for failing', () => {
  assert(output['skip.js'].match('failing') === null);
});

miniTest('done.js has 2 passing test', () => {
  assert(output['done.js'].match('2 passing')); // todo: better assertions by using a pattern selector and grep out the diget to compare against
});

miniTest('done.js has 4 failing test', () => {
  const match = output['done.js'].match('4 failing');
  assert.equal(match.length, 1);
});

miniTest('promise.js has 2 passing test', () => {
  const match = output['promise.js'].match('2 passing');
  assert.equal(match.length, 1);
});

miniTest('promise.js has 4 failing test', () => {
  const match = output['promise.js'].match('4 failing');
  assert.equal(match.length, 1);
});

miniTestReport();

