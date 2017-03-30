module.exports = (colorApi) => {
  const { red, green, yellow, magenta, cyan } = colorApi;
  const startTime = Date.now();

  const getDuration = () => `(${Date.now() - startTime}ms)`;
  const appendDuration = (str) => `${str} ${cyan(getDuration())}`;
  const getLastItem = ar => ar[ar.length - 1];
  const getCurrentIteration = state => getLastItem(state.iterations);

  const indent = (str) => `  ${str}`;
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
    console.log(indent(`${magenta(fileName)} ${yellow(test.title)}`));
    try {
      const parsed = JSON.parse(test.error);
      console.log(indent(red(parsed.message)));
      console.log(indent(parsed.stack));
    } catch (error) {
      console.log(indent(red(JSON.stringify(test.error))));
    }
  };

  const renderFailingTestsOfIteration = iteration => {
    Object.keys(iteration.files).forEach(fileName => {
      iteration.files[fileName].fail.forEach(test => {
        renderFailingTest(fileName, test);
      });
    });
  };

  console.log(indent(cyan('Starting...')));

  return {
    pass: (state, fileName) => {
      const iteration = getCurrentIteration(state);
      const test = getLastItem(iteration.files[fileName].pass);
      console.log(indent(`${green('✓')} ${cyan(test.title)}`));
    },
    fail: (state, fileName) => {
      const iteration = getCurrentIteration(state);
      const test = getLastItem(iteration.files[fileName].fail);
      console.log(indent(red(`Fail: ${test.title}`)));
    },
    report: (state, fileName) => {
      console.log(indent(cyan(`Done: ${fileName}`)));
    },
    finish: (state) => {
      const iteration = getCurrentIteration(state);
      console.log('');
      console.log(indent(appendDuration(appendFailing(appendPassing('', iteration), iteration))));
      renderFailingTestsOfIteration(iteration);
    }
  };
};
