
const { miniTest, miniTestReport } = require('../util/mini-test')();
const assert = require('assert');
const parseOptions = require('./options');

miniTest('parseOptions returns the default state when no args are passed', () => {
  assert.deepEqual(parseOptions([]), {
    isWatchMode: false,
    require: [],
    testFiles: []
  });
});

miniTest('parseOptions handles --watch', () => {
  assert.deepEqual(parseOptions(['--watch']), {
    isWatchMode: true,
    require: [],
    testFiles: []
  });
});

miniTest('parseOptions handles --require', () => {
  assert.deepEqual(parseOptions(['--require=babel-register']), {
    isWatchMode: false,
    require: ['babel-register'],
    testFiles: []
  });
});

miniTest('parseOptions handles --require with multiple values', () => {
  assert.deepStrictEqual(parseOptions(['--require=babel-register,./local-script.js']), {
    isWatchMode: false,
    require: ['babel-register', './local-script.js'],
    testFiles: []
  });
});

miniTest('parseOptions throws when --require argument is present without a option', () => {
  assert.throws(
    () => parseOptions(['--require']),
    /--require option passed without any argument. e.g.: "--require=babel-register"/
  );
});

miniTest('parseOptions handles passed test files', () => {
  assert.deepEqual(parseOptions(['file.spec.js', 'another.spec.js']), {
    isWatchMode: false,
    require: [],
    testFiles: ['file.spec.js', 'another.spec.js']
  });
});

miniTest('parseOptions successfully handles integration example', () => {
  assert.deepEqual(parseOptions(['file.spec.js', '--watch', '--require=babel-register', 'another.spec.js']), {
    isWatchMode: true,
    require: ['babel-register'],
    testFiles: ['file.spec.js', 'another.spec.js']
  });
});

miniTestReport();
