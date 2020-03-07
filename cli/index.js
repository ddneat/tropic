#!/usr/bin/env node
const startTime = Date.now();

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const { createWatcher } = require('./watcher');
const createReporter = require('./reporter');
const createState = require('./state');
const parseOptions = require('../util/options');
const colorApi = require('../util/color-api');
const os = require('os');

const { getState, createIteration } = createState();
const options = parseOptions(process.argv.slice(2));

const createOnMessage = (iterationApi, reporter) => {
  return (fileName, message) => {
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

const createProcessPool = () => {
  const pool = [];

  const killProcesses = ar => ar.forEach(process => {
    process.kill();
  });

  return {
    add: (process) => { pool.push(process); },
    remove: (process) => {
      killProcesses(pool.filter(item => item.pid === process.pid));
    },
    cancel: () => {
      killProcesses(pool);
    }
  };
};

const execTests = () => {
  const reporter = createReporter(colorApi);
  const processPool = createProcessPool();
  const iterationApi = createIteration();
  const onMessage = createOnMessage(iterationApi, reporter);
  let canceled = false;

  const disconnect = (child, isLast) => {
    processPool.remove(child);
    if (isLast && !canceled) {
      reporter.finish(getState());
    }
  };

  const cancel = () => {
    canceled = true;
    processPool.cancel();
    reporter.cancel();
  };

  let currentIndex = 0;
  let currentRunning = 0;
  let coreLimit = os.cpus().length;

  const runFile = (testFile) => {
    const childArgs = [ path.join(__dirname, 'execute'), testFile ];
    childArgs.push(`--timeout=${options.timeout}`);
    if (options.require.length) {
      childArgs.push(`--require=${options.require.join(',')}`);
    }
    const child = cp.spawn(process.argv[0], childArgs, { stdio: ['inherit', 'inherit', 'inherit', null, 'pipe'] });
    processPool.add(child);
    currentRunning += 1;

    const runNext = () => {
      if (
        currentIndex < options.testFiles.length - 1 &&
        currentRunning < coreLimit &&
        !canceled
      ) {
        const localIndex = ++currentIndex;
        runFile(options.testFiles[localIndex]);
      }
    };

    child.stdio[4].on('data', data => {
      if (canceled) return;
      data
        .toString()
        .split('--tropic_delimiter--')
        .filter(item => item.length)
        .forEach(item => onMessage(testFile, JSON.parse(item)));
    });

    child.on('close', (code) => {
      iterationApi.setCode(testFile, code);
      currentRunning--;
      const isLast = options.testFiles.length - 1 - currentIndex + currentRunning <= 0;
      disconnect(child, isLast);
      runNext();
    });

    runNext();
  };

  runFile(options.testFiles[currentIndex]);

  return {
    cancel
  };
};

const getExistCode = (currentState) => {
  const currentIteration = currentState.iterations[currentState.iterations.length - 1];
  const anyTestFailedOrNoneHasPassed = currentIteration.failCount >= 0 || currentIteration.passCount <= 0;
  const allStatusCodes = Object.keys(currentIteration.files).map(key => currentIteration.files[key].code);
  const anyTestFileExitedWithBadStatusCode = allStatusCodes.reduce((acc, curr) => acc + curr, 0) !== 0;
  return anyTestFailedOrNoneHasPassed || anyTestFileExitedWithBadStatusCode ? 1 : 0;
};

process.on('beforeExit', () => {
  console.log(colorApi.cyan(`\n${Date.now() - startTime}ms execution time`));
  process.exitCode = getExistCode(getState());
});

const logChanges = files => {
  console.log('');
  console.log(colorApi.blackCyanBackground(` Watcher: ${files.join(', ')} `));
  console.log('');
};

if (options.isWatchMode) {
  let execApi;
  createWatcher(fs, setInterval, files => {
    logChanges(files);
    if (execApi) execApi.cancel();
    execApi = execTests();
  });
}

execTests();
