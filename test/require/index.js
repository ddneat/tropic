const { miniTest, miniTestReport } = require('../../util/mini-test')();
const { passingCount, runFiles } = require('../helper');
const assert = require('assert');

const files = [
  {
    path: 'babel-only.js',
    args: ['--require=babel-register']
  }, {
    path: 'multiple-options.js',
    args: ['--require=babel-register,./test/require/custom-script.js']
  }
];

const output = runFiles(files, './test/require');

miniTest('babel-only has 1 passing test', () => {
  const log = output['babel-only.js'];
  assert.equal(passingCount(log), 1);
});

miniTest('multiple-options has 1 passing test', () => {
  const log = output['multiple-options.js'];
  assert.equal(passingCount(log), 1);
});

miniTestReport();
