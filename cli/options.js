const COMPILER_HAS_NO_OPTION = '--require argument passed without any option e.g.: "--require babel-register"';
const COMPILER_HAS_INVALID_OPTION = '--require has an invalid option e.g.: "--watch"';

module.exports = (processArgs) => {
  const options = {
    isWatchMode: false,
    require: [],
    testFiles: []
  };

  const isArg = arg => ['--watch', '--require'].indexOf(arg) !== -1;
  const validateCompilerOption = option => {
    if (!option) throw new Error(COMPILER_HAS_NO_OPTION);
    if (isArg(option)) throw new Error(COMPILER_HAS_INVALID_OPTION);
    return option;
  };

  const parseNextArgument = leftArgs => {
    if (leftArgs.length === 0) return;
    const arg = leftArgs.shift();

    switch (arg) {
      case '--watch':
        options.isWatchMode = true;
        break;
      case '--require':
        options.require.push(validateCompilerOption(leftArgs.shift()));
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
