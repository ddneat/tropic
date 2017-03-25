module.exports = (colorApi) => {
  const { red, green, yellow, magenta, cyan } = colorApi;
  const startTime = Date.now();

  const getDuration = () => `(${Date.now() - startTime}ms)`;
  const appendDuration = (str) => `${str} ${cyan(getDuration())}`;
  const getLastItem = ar => ar[ar.length - 1];
  const getCurrentIteration = state => getLastItem(state.iterations);

  const appendPassing = (str, iteration) => {
    return green(`${str}${iteration.passCount} passing`);
  };

  const appendFailing = (str, iteration) => {
    return iteration.failCount
      ? `${str} ${red(`${iteration.failCount} failing`)}`
      : str;
  };

  const renderFailingTest = (fileName, test) => {
    console.log('');
    console.log(magenta(fileName), yellow(test.title));
    try {
      const parsed = JSON.parse(test.error);
      console.log(red(parsed.message));
      console.log(parsed.stack);
    } catch (error) {
      console.log(red(JSON.stringify(test.error)));
    }
  };

  const renderFailingTestsOfIteration = iteration => {
    Object.keys(iteration.files).forEach(fileName => {
      iteration.files[fileName].fail.forEach(test => {
        renderFailingTest(fileName, test);
      });
    });
  };

  console.log(cyan('Starting...'));

  return {
    pass: (state, fileName) => {
      const iteration = getCurrentIteration(state);
      const test = getLastItem(iteration.files[fileName].pass);
      console.log(green(`Pass: ${test.title}`));
    },
    fail: (state, fileName) => {
      const iteration = getCurrentIteration(state);
      const test = getLastItem(iteration.files[fileName].fail);
      console.log(red(`Fail: ${test.title}`));
    },
    report: (state, fileName) => {
      console.log(cyan(`Done: ${fileName}`));
    },
    finish: (state) => {
      const iteration = getCurrentIteration(state);
      console.log(appendDuration(appendFailing(appendPassing('', iteration), iteration)));
      renderFailingTestsOfIteration(iteration);
    }
  };
};
