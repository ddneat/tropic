function logFail (message, error) {
  console.error('\x1B[31m' + 'Failed: ' + message + '\x1B[0m');
  console.error(error);
  process.exit(1);
}

function logPass (message) {
  console.log('\x1B[32m' + 'Passed: ' + message + '\x1B[0m');
}

function logReport (message) {
  console.log(message);
}

const createSpy = () => {
  const argActions = [];
  function spy (...args) {
    spy.args.push(args);
    argActions.map(action => {
      args[action.index](...action.withArgs);
    });
  }
  spy.args = [];
  spy.callsArgWith = (index, ...args) => {
    argActions.push({ index, withArgs: args });
  };
  return spy;
};

module.exports = () => {
  const state = {
    execCount: 0,
    passCount: 0
  };

  const miniTest = (title, callback) => {
    state.execCount++;
    try {
      callback();
    } catch (error) {
      return logFail(title, error);
    }
    state.passCount++;
    logPass(title);
  };

  const miniTestReport = () => {
    logReport(`Passed: ${state.passCount} / ${state.execCount}`);
  };

  return {
    miniTest,
    miniTestReport,
    createSpy
  };
};
