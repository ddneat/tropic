const { miniTest, miniTestReport, createSpy } = require('../util/mini-test')();
const assert = require('assert');
const { createRunner } = require('./runner');

miniTest('createRunner returns function executeTestsWithState', () => {
  const executeTestsWithState = createRunner();
  assert.equal(Object.prototype.toString.call(executeTestsWithState), '[object Function]');
});

miniTest('executeTestsWithState calls the tests', () => {
  const logPass = () => {};
  const logFail = () => {};
  const logReport = () => {};
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTestSpy = () => {
    return {
      title: 'test spy',
      callback: createSpy()
    };
  };

  const state = {
    test: [createTestSpy(), createTestSpy()],
    only: [],
    skip: []
  };

  executeTestsWithState(state);
  assert.equal(state.test[0].callback.args.length, 1);
  assert.equal(state.test[1].callback.args.length, 1);
});

miniTest('executeTestsWithState calls the only tests', () => {
  const logPass = () => {};
  const logFail = () => {};
  const logReport = () => {};
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTestSpy = () => {
    return {
      title: 'test spy',
      callback: createSpy()
    };
  };

  const state = {
    test: [],
    only: [createTestSpy(), createTestSpy()],
    skip: []
  };

  executeTestsWithState(state);
  assert.equal(state.only[0].callback.args.length, 1);
  assert.equal(state.only[1].callback.args.length, 1);
});

miniTest('executeTestsWithState does not call the skip tests', () => {
  const logPass = () => {};
  const logFail = () => {};
  const logReport = () => {};
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTestSpy = () => {
    return {
      title: 'test spy',
      callback: createSpy()
    };
  };

  const state = {
    test: [],
    only: [],
    skip: [createTestSpy(), createTestSpy()]
  };

  executeTestsWithState(state);
  assert.equal(state.skip[0].callback.args.length, 0);
  assert.equal(state.skip[1].callback.args.length, 0);
});

miniTestReport();
