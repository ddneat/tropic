module.exports = (colorApi) => {
  const { red, green, yellow, magenta, cyan } = colorApi;
  const startTime = Date.now();

  const getDuration = () => `(${Date.now() - startTime}ms)`;
  const appendDuration = (str) => `${str} ${cyan(getDuration())}`;
  const getLastItem = ar => ar[ar.length - 1];
  const getCurrentIteration = state => getLastItem(state.iterations);

  const log = str => console.log(`${str}`);
  const appendPassing = (str, iteration) => {
    return green(`${str}${iteration.passCount} passing`);
  };

  const appendFailing = (str, iteration) => {
    return iteration.failCount
      ? `${str} ${red(`${iteration.failCount} failing`)}`
      : str;
  };

  const renderFailingTest = (fileName, test) => {
    log('');
    log(`${magenta(fileName)} ${yellow(test.title)}`);
    try {
      const parsed = JSON.parse(test.error);
      log(red(parsed.message));
      log(parsed.stack);
    } catch (error) {
      log(red(JSON.stringify(test.error)));
    }
  };

  const renderFailingTestsOfIteration = iteration => {
    Object.keys(iteration.files).forEach(fileName => {
      iteration.files[fileName].fail.forEach(test => {
        renderFailingTest(fileName, test);
      });
    });
  };

  log(cyan('Starting...'));

  return {
    pass: (state, fileName) => {
      const iteration = getCurrentIteration(state);
      const test = getLastItem(iteration.files[fileName].pass);
      log(`${green('✓')} ${cyan(test.title)}`);
    },
    fail: (state, fileName) => {
      const iteration = getCurrentIteration(state);
      const test = getLastItem(iteration.files[fileName].fail);
      log(red(`Fail: ${test.title}`));
    },
    report: (state, fileName) => {
      log(cyan(`Done: ${fileName}`));
    },
    cancel: () => {
      log(cyan('Cancel...'));
    },
    finish: (state) => {
      const iteration = getCurrentIteration(state);
      log('');
      log(appendDuration(appendFailing(appendPassing('', iteration), iteration)));
      renderFailingTestsOfIteration(iteration);
    }
  };
};
