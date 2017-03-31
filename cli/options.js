const REQUIRE_HAS_NO_OPTION = '--require argument passed without any option e.g.: "--require babel-register"';
const REQUIRE_HAS_INVALID_OPTION = '--require has an invalid option e.g.: "--watch"';

module.exports = (processArgs) => {
  const options = {
    isWatchMode: false,
    require: [],
    testFiles: []
  };

  const isArg = arg => ['--watch', '--require'].indexOf(arg) !== -1;
  const hasMultipleOptions = option => option && option[0] === '[' && option.slice(-1) === ']';
  const validateRequireOption = option => {
    if (!option) throw new Error(REQUIRE_HAS_NO_OPTION);
    if (isArg(option)) throw new Error(REQUIRE_HAS_INVALID_OPTION);
    return option.replace(' ', '');
  };

  const parseNextArgument = leftArgs => {
    if (leftArgs.length === 0) return;
    const arg = leftArgs.shift();

    switch (arg) {
      case '--watch':
        options.isWatchMode = true;
        break;
      case '--require':
        let opt = leftArgs.shift();
        opt = hasMultipleOptions(opt) ? opt.slice(1, -1).split(',') : [opt];
        opt.forEach(current =>
          options.require.push(validateRequireOption(current))
        );
        break;
      default:
        options.testFiles.push(arg);
        break;
    }

    parseNextArgument(leftArgs);
  };

  parseNextArgument(processArgs);
  return options;
};
