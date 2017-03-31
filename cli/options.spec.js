
const { miniTest, miniTestReport } = require('../util/mini-test')();
const assert = require('assert');
const parseArgs = require('./options');

miniTest('parseArgs returns the default state when no args are passed', () => {
  assert.deepEqual(parseArgs([]), {
    isWatchMode: false,
    require: [],
    testFiles: []
  });
});

miniTest('parseArgs handles --watch', () => {
  assert.deepEqual(parseArgs(['--watch']), {
    isWatchMode: true,
    require: [],
    testFiles: []
  });
});

miniTest('parseArgs handles --require', () => {
  assert.deepEqual(parseArgs(['--require', 'babel-register']), {
    isWatchMode: false,
    require: ['babel-register'],
    testFiles: []
  });
});

miniTest('parseArgs throws when --require argument is present without a option', () => {
  assert.throws(
    () => parseArgs(['--require']),
    /--require argument passed without any option e.g.: "--require babel-register"/
  );
});

miniTest('parseArgs throws when --require argument is present with an arg as option', () => {
  assert.throws(
    () => parseArgs(['--require', '--watch']),
    /--require has an invalid option e.g.: "--watch"/
  );
});

miniTest('parseArgs handles passed test files', () => {
  assert.deepEqual(parseArgs(['file.spec.js', 'another.spec.js']), {
    isWatchMode: false,
    require: [],
    testFiles: ['file.spec.js', 'another.spec.js']
  });
});

miniTest('parseArgs successfully handles integration example', () => {
  assert.deepEqual(parseArgs(['file.spec.js', '--watch', '--require', 'babel-register', 'another.spec.js']), {
    isWatchMode: true,
    require: ['babel-register'],
    testFiles: ['file.spec.js', 'another.spec.js']
  });
});

miniTestReport();
