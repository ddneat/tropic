const fs = require('fs');
const createState = require('./state');
const createTest = require('./test');
const { createRunner } = require('./runner');

const logStream = fs.createWriteStream(null, { fd: 4 });
const write = obj => logStream.write(JSON.stringify(obj) + '--tropic_delimiter--');

const logPass = (title) => {
  write({ type: 'pass', title: title });
};

const logFail = (title, error) => {
  write({ type: 'fail', title: title, error: error });
};

const logReport = (payload) => {
  write({ type: 'report', payload });
  logStream.end();
};

const { getState, addTest, addTestWithOnly, addTestWithSkip } = createState();
const execWithState = createRunner(logPass, logFail, logReport);
const test = createTest(addTest, addTestWithOnly, addTestWithSkip);

process.once('beforeExit', () => {
  execWithState(getState());
});

module.exports = test;
