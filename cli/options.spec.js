
const { miniTest, miniTestReport } = require('../util/mini-test')();
const assert = require('assert');
const parseArgs = require('./options');

miniTest('parseArgs returns the default state when no args are passed', () => {
  assert.deepEqual(parseArgs([]), {
    isWatchMode: false,
    compiler: [],
    testFiles: []
  });
});

miniTest('parseArgs handles --watch', () => {
  assert.deepEqual(parseArgs(['--watch']), {
    isWatchMode: true,
    compiler: [],
    testFiles: []
  });
});

miniTest('parseArgs handles --compiler', () => {
  assert.deepEqual(parseArgs(['--compiler', 'babel-register']), {
    isWatchMode: false,
    compiler: ['babel-register'],
    testFiles: []
  });
});

miniTest('parseArgs throws when --compiler argument is present without a option', () => {
  assert.throws(
    () => parseArgs(['--compiler']),
    /--compiler argument passed without any option e.g.: "--compiler babel-register"/
  );
});

miniTest('parseArgs throws when --compiler argument is present with an arg as option', () => {
  assert.throws(
    () => parseArgs(['--compiler', '--watch']),
    /--compiler has an invalid option e.g.: "--watch"/
  );
});

miniTest('parseArgs handles passed test files', () => {
  assert.deepEqual(parseArgs(['file.spec.js', 'another.spec.js']), {
    isWatchMode: false,
    compiler: [],
    testFiles: ['file.spec.js', 'another.spec.js']
  });
});

miniTest('parseArgs successfully handles integration example', () => {
  assert.deepEqual(parseArgs(['file.spec.js', '--watch', '--compiler', 'babel-register', 'another.spec.js']), {
    isWatchMode: true,
    compiler: ['babel-register'],
    testFiles: ['file.spec.js', 'another.spec.js']
  });
});

miniTestReport();
