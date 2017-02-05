module.exports = (logPass, logFail, logReport) => {
  function runTests (tests) {
    tests.forEach((test) => {
      try {
        test.callback();
      } catch (error) {
        return logFail(test.title, error);
      }
      logPass(test.title);
    });
  }

  return (state) => {
    const tests = state.only.length ? state.only : state.test;
    runTests(tests);

    const executedCount = tests.length;
    const allTestsLength = state.test.length + state.only.length + state.skip.length;
    const onlyLength = state.only.length;
    const skipLength = state.skip.length;
    logReport(executedCount, allTestsLength, onlyLength, skipLength);
  };
};
