const { miniTest, miniTestReport, createSpy } = require('./mini-test')();
const assert = require('assert');
const { createRunner } = require('./runner');

miniTest('createRunner returns function executeTestsWithState', () => {
  const executeTestsWithState = createRunner();
  assert.equal(Object.prototype.toString.call(executeTestsWithState), '[object Function]');
});

miniTest('executeTestsWithState calls passed logReport', () => {
  const logPass = () => {};
  const logFail = () => {};
  const logReport = createSpy();
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const state = {
    test: [],
    only: [],
    skip: []
  };

  executeTestsWithState(state);
  assert.equal(logReport.args.length, 1);
});

miniTest('executeTestsWithState calls passed logReport with payload', () => {
  const logPass = () => {};
  const logFail = () => {};
  const logReport = createSpy();
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const state = {
    test: [],
    only: [],
    skip: []
  };

  executeTestsWithState(state);
  assert.deepEqual(logReport.args[0][0], {
    executedCount: 0,
    allTestsLength: 0,
    onlyLength: 0,
    skipLength: 0
  });
});

miniTest('executeTestsWithState calls passed logReport with calc payload', () => {
  const logPass = () => {};
  const logFail = () => {};
  const logReport = createSpy();
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTest = () => {
    return {
      title: 'some title',
      callback: () => {}
    }
  };

  const state = {
    test: [createTest(), createTest(), createTest()],
    only: [createTest(), createTest()],
    skip: [createTest()]
  };

  executeTestsWithState(state);
  assert.deepEqual(logReport.args[0][0], {
    executedCount: 2,
    allTestsLength: 6,
    onlyLength: 2,
    skipLength: 1
  });
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
    }
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
    }
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
    }
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

miniTest('executeTestsWithState calls logPass with the title for each test which does not throw', () => {
  const logPass = createSpy();
  const logFail = () => {};
  const logReport = () => {};
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTest = (title) => {
    return {
      title,
      callback: () => {}
    }
  };

  const state = {
    test: [createTest('one'), createTest('two')],
    only: [],
    skip: []
  };

  executeTestsWithState(state);
  assert.equal(logPass.args.length, 2);
  assert.deepEqual(logPass.args[0], ['one']);
  assert.deepEqual(logPass.args[1], ['two']);
});

miniTest('executeTestsWithState does not call logFail when test does not throw', () => {
  const logPass = () => {};
  const logFail = createSpy();
  const logReport = () => {};
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTest = () => {
    return {
      title: 'some title',
      callback: () => {}
    }
  };

  const state = {
    test: [createTest(), createTest()],
    only: [],
    skip: []
  };

  executeTestsWithState(state);
  assert.equal(logFail.args.length, 0);
});

miniTest('executeTestsWithState calls logPass with the title for each only test which does not throw', () => {
  const logPass = createSpy();
  const logFail = () => {};
  const logReport = () => {};
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTest = () => {
    return {
      title: 'some title',
      callback: () => {}
    }
  };

  const state = {
    test: [],
    only: [createTest()],
    skip: []
  };

  executeTestsWithState(state);
  assert.equal(logPass.args.length, 1);
  assert.deepEqual(logPass.args[0], ['some title']);
});

miniTest('executeTestsWithState does not call logFail when only test does not throw', () => {
  const logPass = () => {};
  const logFail = createSpy();
  const logReport = () => {};
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTest = () => {
    return {
      title: 'some title',
      callback: () => {}
    }
  };

  const state = {
    test: [],
    only: [createTest(), createTest()],
    skip: []
  };

  executeTestsWithState(state);
  assert.equal(logFail.args.length, 0);
});

miniTest('executeTestsWithState does neither call logFail nor logPass for skip tests', () => {
  const logPass = createSpy();
  const logFail = createSpy();
  const logReport = () => {};
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTest = () => {
    return {
      title: 'some title',
      callback: () => {}
    }
  };

  const state = {
    test: [],
    only: [],
    skip: [createTest(), createTest()]
  };

  executeTestsWithState(state);
  assert.equal(logPass.args.length, 0);
  assert.equal(logFail.args.length, 0);
});

miniTest('executeTestsWithState calls logFail with the title and error for each test which throws', () => {
  const logPass = () => {};
  const logFail = createSpy();
  const logReport = () => {};
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTest = () => {
    return {
      title: 'some title',
      callback: () => {
        throw new Error('some callstack with an error message');
      }
    }
  };

  const state = {
    test: [createTest()],
    only: [],
    skip: []
  };

  executeTestsWithState(state);
  assert.equal(logFail.args.length, 1);
  assert.deepEqual(logFail.args[0][0], 'some title');
  assert.throws(() => { throw logFail.args[0][1] }, /some callstack with an error message/);
});

miniTest('executeTestsWithState does not call logPass when test throws', () => {
  const logPass = createSpy();
  const logFail = () => {};
  const logReport = () => {};
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTest = () => {
    return {
      title: 'some title',
      callback: () => {
        throw new Error('error message');
      }
    }
  };

  const state = {
    test: [createTest(), createTest()],
    only: [],
    skip: []
  };

  executeTestsWithState(state);
  assert.equal(logPass.args.length, 0);
});

miniTest('executeTestsWithState calls logFail with the title and error for each only test which throws', () => {
  const logPass = () => {};
  const logFail = createSpy();
  const logReport = () => {};
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTest = () => {
    return {
      title: 'some title',
      callback: () => {
        throw new Error('some callstack with an error message');
      }
    }
  };

  const state = {
    test: [],
    only: [createTest()],
    skip: []
  };

  executeTestsWithState(state);
  assert.equal(logFail.args.length, 1);
  assert.deepEqual(logFail.args[0][0], 'some title');
  assert.throws(() => { throw logFail.args[0][1] }, /some callstack with an error message/);
});

miniTest('executeTestsWithState does not call logPass when only test throws', () => {
  const logPass = createSpy();
  const logFail = () => {};
  const logReport = () => {};
  const executeTestsWithState = createRunner(logPass, logFail, logReport);

  const createTest = () => {
    return {
      title: 'some title',
      callback: () => {
        throw new Error('error message');
      }
    }
  };

  const state = {
    test: [],
    only: [createTest(), createTest()],
    skip: []
  };

  executeTestsWithState(state);
  assert.equal(logPass.args.length, 0);
});

miniTestReport();
