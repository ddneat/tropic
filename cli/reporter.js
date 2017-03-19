const moveCursorUp = '\x1B[A';
const clearLine = '\x1B[2K';
const erasePrevline = moveCursorUp + clearLine;
const overWritePrevious = (str) => `${erasePrevline}${str}`;

// let counter = 0;
// const animation = ['.', ':', '*', ':', '.', '_'];
// setInterval(() => {
//   rl.write(null, {ctrl: true, name: 'u'});
//   const index = counter++ % animation.length;
//   rl.write(`${animation[index]} Tests passed ${counter}`);
// }, 150);

module.exports = (colorApi) => {
  const { red, green, yellow, magenta, cyan } = colorApi;
  const startTime = Date.now();

  const getDuration = () => `(${Date.now() - startTime}ms)`;
  const appendDuration = (str) => `${str} ${cyan(getDuration())}`;

  const getCurrentIteration = (state) => {
    return state.iterations[state.iterations.length - 1];
  };

  const appendPassing = (str, iteration) => {
    return green(`${str}${iteration.passCount} passing`);
  };

  const appendFailing = (str, iteration) => {
    return iteration.failCount
      ? `${str} ${red(`${iteration.failCount} failing`)}`
      : str;
  };

  console.log('Starting...');

  return {
    update: (state) => {
      console.log('update');
      console.log('');
      const iteration = getCurrentIteration(state);
      console.log(overWritePrevious(appendFailing(appendPassing('', iteration), iteration)));
    },
    finish: (state) => {
      console.log('finish');
      console.log('');
      const iteration = getCurrentIteration(state);
      console.log(overWritePrevious(appendDuration(appendFailing(appendPassing('', iteration), iteration))));

      Object.keys(iteration.files).forEach(fileName => {
        iteration.files[fileName].fail.forEach(test => {
          console.log('');
          console.log(magenta(fileName), yellow(test.title));
          try {
            const parsed = JSON.parse(test.error);
            console.log(red(parsed.message));
            console.log(parsed.stack);
          } catch (error) {
            console.log(red(JSON.stringify(test.error)));
          }
        });
      });

      // Object.keys(iteration.files).forEach(fileName => {
      //   const report = iteration.files[fileName].report[0];
      //   console.log('');
      //   console.log(cyan(fileName));
      //   console.log(cyan(JSON.stringify(report)));
      // });

      // console.log(yellow('done'));
      // console.log(red('done'));
      // console.log(green('done'));
      // console.log(magenta('done'));
      // console.log(cyan('done'));
      // console.log(blue('done'));
    }
  };
};
