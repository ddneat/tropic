const { miniTest, miniTestReport } = require('../util/mini-test')();
const assert = require('assert');
const createCliState = require('./state');

miniTest('createState returns action getState', () => {
  const actions = createCliState();
  assert.equal(Object.prototype.toString.call(actions.getState), '[object Function]');
});

miniTest('createState returns action createIteration', () => {
  const actions = createCliState();
  assert.equal(Object.prototype.toString.call(actions.createIteration), '[object Function]');
});

miniTest('createIteration returns iteration action addPass', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  assert.equal(Object.prototype.toString.call(iterationActions.addPass), '[object Function]');
});

miniTest('createIteration returns iteration action addFail', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  assert.equal(Object.prototype.toString.call(iterationActions.addFail), '[object Function]');
});

miniTest('createIteration returns iteration action addReport', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  assert.equal(Object.prototype.toString.call(iterationActions.addReport), '[object Function]');
});

miniTest('getState returns initial state', () => {
  const actions = createCliState();
  assert.deepEqual(actions.getState(), { iterations: [] });
});

miniTest('createIteration adds a new instance to the state', () => {
  const actions = createCliState();
  actions.createIteration();
  assert.equal(actions.getState().iterations.length, 1);
});

miniTest('createIteration adds each time a new instance to the state', () => {
  const actions = createCliState();
  actions.createIteration();
  actions.createIteration();
  assert.equal(actions.getState().iterations.length, 2);
});

miniTest('createIteration adds instance with property failCount', () => {
  const actions = createCliState();
  actions.createIteration();
  const iteration = actions.getState().iterations[0];
  assert.equal(iteration.failCount, 0);
});

miniTest('createIteration adds instance with property passCount', () => {
  const actions = createCliState();
  actions.createIteration();
  const iteration = actions.getState().iterations[0];
  assert.equal(iteration.passCount, 0);
});

miniTest('createIteration adds instance with property files', () => {
  const actions = createCliState();
  actions.createIteration();
  const iteration = actions.getState().iterations[0];
  assert.deepEqual(Object.prototype.toString.call(iteration.files), '[object Object]');
});

miniTest('createIteration adds instance with initial properties', () => {
  const actions = createCliState();
  actions.createIteration();
  const iteration = actions.getState().iterations[0];
  assert.deepEqual(iteration, {
    failCount: 0,
    passCount: 0,
    files: {}
  });
});

miniTest('iteration addPass increments the passCount', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  iterationActions.addPass('test.js', 'test description');
  assert.equal(actions.getState().iterations[0].passCount, 1);
});

miniTest('iteration addPass creates a file and pushes into pass', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  iterationActions.addPass('test.js', 'test description');
  const files = actions.getState().iterations[0].files;
  assert.deepEqual(files['test.js'], {
    pass: [{ title: 'test description' }],
    fail: [],
    report: [],
    code: 1
  });
});

miniTest('iteration addPass does not overwrite previous state', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  iterationActions.addPass('test.js', 'first');
  iterationActions.addPass('test.js', 'second');
  iterationActions.addPass('test.js', 'last');
  const files = actions.getState().iterations[0].files;
  assert.deepEqual(files['test.js'], {
    pass: [{ title: 'first' }, { title: 'second' }, { title: 'last' }],
    fail: [],
    report: [],
    code: 1
  });
});

miniTest('iteration addFail increments the failCount', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  iterationActions.addFail('test.js', 'test description', 'error message');
  assert.equal(actions.getState().iterations[0].failCount, 1);
});

miniTest('iteration addFail creates a file and pushes into pass', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  iterationActions.addFail('test.js', 'test description', 'error message');
  const files = actions.getState().iterations[0].files;
  assert.deepEqual(files['test.js'], {
    pass: [],
    fail: [{ title: 'test description', error: 'error message' }],
    report: [],
    code: 1
  });
});

miniTest('iteration addFail does not overwrite previous state', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  iterationActions.addFail('test.js', 'first', 'error message');
  iterationActions.addFail('test.js', 'second', 'error message');
  iterationActions.addFail('test.js', 'last', 'error message');
  const files = actions.getState().iterations[0].files;
  assert.deepEqual(files['test.js'], {
    pass: [],
    fail: [
      { title: 'first', error: 'error message' },
      { title: 'second', error: 'error message' },
      { title: 'last', error: 'error message' }
    ],
    report: [],
    code: 1
  });
});

miniTest('iteration addReport creates a file and pushes into report', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  iterationActions.addReport('test.js', 'metadata');
  const files = actions.getState().iterations[0].files;
  assert.deepEqual(files['test.js'], {
    pass: [],
    fail: [],
    report: ['metadata'],
    code: 1
  });
});

miniTest('iteration addReport does not overwrite reports', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  iterationActions.addReport('test.js', 'first');
  iterationActions.addReport('test.js', 'second');
  iterationActions.addReport('test.js', 'last');
  const files = actions.getState().iterations[0].files;
  assert.deepEqual(files['test.js'], {
    pass: [],
    fail: [],
    report: ['first', 'second', 'last'],
    code: 1
  });
});

miniTest('iteration works with multiple files', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  iterationActions.addPass('first.js', 'any test');
  iterationActions.addFail('second.js', 'failing one', 'error message');
  iterationActions.addPass('first.js', 'another test');
  const iteration = actions.getState().iterations[0];
  assert.equal(iteration.passCount, 2);
  assert.equal(iteration.failCount, 1);
  assert.deepEqual(iteration.files, {
    'first.js': {
      pass: [{ title: 'any test' }, { title: 'another test' }],
      fail: [],
      report: [],
      code: 1
    },
    'second.js': {
      pass: [],
      fail: [{ title: 'failing one', error: 'error message' }],
      report: [],
      code: 1
    }
  });
});

miniTest('setCode works with multiple files', () => {
  const actions = createCliState();
  const iterationActions = actions.createIteration();
  iterationActions.setCode('first.js', 0);
  iterationActions.setCode('second.js', 1);
  iterationActions.setCode('third.js', 2);
  const iteration = actions.getState().iterations[0];
  assert.deepEqual(iteration.files, {
    'first.js': {
      pass: [],
      fail: [],
      report: [],
      code: 0
    },
    'second.js': {
      pass: [],
      fail: [],
      report: [],
      code: 1
    },
    'third.js': {
      pass: [],
      fail: [],
      report: [],
      code: 2
    }
  });
});

miniTestReport();
