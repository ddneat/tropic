const COMPILER_HAS_NO_OPTION = '--compiler argument passed without any option e.g.: "--compiler babel-register"';
const COMPILER_HAS_INVALID_OPTION = '--compiler has an invalid option e.g.: "--watch"';

module.exports = (processArgs) => {
  const options = {
    isWatchMode: false,
    compiler: [],
    testFiles: []
  };

  const isArg = arg => ['--watch', '--compiler'].indexOf(arg) !== -1;
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
      case '--compiler':
        options.compiler.push(validateCompilerOption(leftArgs.shift()));
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
