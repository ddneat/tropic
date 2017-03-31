#!/usr/bin/env node
const startTime = Date.now();

const fs = require('fs');
const cp = require('child_process');
const { createWatcher } = require('./watcher');
const createReporter = require('./reporter');
const createState = require('./state');
const parseArgs = require('./options');
const colorApi = require('../util/color-api');

const { getState, createIteration } = createState();
const options = parseArgs(process.argv.slice(2));

const createOnMessage = (fileName, iterationApi, reporter) => {
  return (message) => {
    if (message.type === 'pass') {
      iterationApi.addPass(fileName, message.title);
      reporter.pass(getState(), fileName);
    } else if (message.type === 'fail') {
      iterationApi.addFail(fileName, message.title, message.error);
      reporter.fail(getState(), fileName);
    } else if (message.type === 'report') {
      iterationApi.addReport(fileName, message.payload);
      reporter.report(getState(), fileName);
    }
  };
};

const createDisconnect = (reporter, childrenLength) => {
  return () => {
    childrenLength -= 1;
    if (childrenLength === 0) {
      reporter.finish(getState());
    }
  };
};

const execTests = () => {
  const reporter = createReporter(colorApi);
  const disconnect = createDisconnect(reporter, options.testFiles.length);
  const iterationApi = createIteration();

  options.testFiles.forEach(testFile => {
    const childArgs = [ testFile ];
    if (options.require.length) {
      childArgs.push('--require', `[${options.require.join(', ')}]`);
    }
    const child = cp.fork('../tropic/cli/execute', childArgs);
    child.on('message', createOnMessage(testFile, iterationApi, reporter));
    child.on('disconnect', disconnect);
  });
};

process.on('exit', () => {
  console.log(`\n${Date.now() - startTime}ms execution time`);
});

if (options.isWatchMode) {
  createWatcher(fs, setInterval, (files) => {
    console.log(`changes: ${files.join(', ')}\n`);
    execTests();
  });
}

execTests();
