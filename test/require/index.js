const { miniTest, miniTestReport } = require('../../util/mini-test')();
const { passingCount, runFiles } = require('../helper');
const assert = require('assert');

const files = [
  {
    id: 'babel-only',
    path: 'test-babel-only.js',
    args: ['--require=babel-register']
  }, {
    id: 'multiple-options',
    path: 'test-multiple-options.js',
    args: ['--require=babel-register,./test/require/stub-custom-script.js']
  }, {
    id: 'throws-an-error',
    path: 'test-pass.js',
    args: ['--require=./test/require/stub-throws-an-error.js']
  }, {
    id: 'missspelled',
    path: 'test-pass.js',
    args: ['--require=./test/require/missspelled.js']
  }
];

const output = runFiles(files, './test/require');

miniTest('babel-only has 1 passing test', () => {
  const testFile = output['babel-only'];
  assert.equal(passingCount(testFile.stdout), 1);
});

miniTest('multiple-options has 1 passing test', () => {
  const testFile = output['multiple-options'];
  assert.equal(passingCount(testFile.stdout), 1);
});

miniTest('throws-an-error has exit status 1', () => {
  const testFile = output['throws-an-error'];
  assert.equal(testFile.status, 1);
});

miniTest('missspelled has exit status 1', () => {
  const testFile = output['missspelled'];
  assert.equal(testFile.status, 1);
});

miniTestReport();
