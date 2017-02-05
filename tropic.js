const { logPass, logFail, logReport } = require('./log');
const createState = require('./state');
const createTest = require('./test');
const createRunner = require('./runner');

const { getState, addTest, addTestWithOnly, addTestWithSkip } = createState();
const execWithState = createRunner(logPass, logFail, logReport);
const test = createTest(addTest, addTestWithOnly, addTestWithSkip);

process.on('exit', () => {
  execWithState(getState());
});

module.exports = test;
