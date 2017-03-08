const createState = require('./state');
const createTest = require('./test');
const { createRunner } = require('./runner');

const logPass = (title) => {
  process.send({ type: 'pass', title: title });
};

const logFail = (title, error) => {
  process.send({ type: 'fail', title: title, error: error });
};

const logReport = (payload) => {
  process.send({ type: 'report', payload });
};

const { getState, addTest, addTestWithOnly, addTestWithSkip } = createState();
const execWithState = createRunner(logPass, logFail, logReport);
const test = createTest(addTest, addTestWithOnly, addTestWithSkip);

process.once('beforeExit', () => {
  execWithState(getState());
});

module.exports = test;
