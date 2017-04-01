const REQUIRE_OPTION_HAS_NO_ARGUMENT = '--require option passed without any argument. e.g.: "--require=babel-register"';

module.exports = (processArgs) => {
  const options = {
    isWatchMode: false,
    require: [],
    testFiles: []
  };

  const parseNextOption = input => {
    if (input.length === 0) return;
    const current = input.shift().split('=');
    const currentOption = current[0];
    const currentArgs = current[1];

    switch (currentOption) {
      case '--watch':
        options.isWatchMode = true;
        break;
      case '--require':
        if (!currentArgs) throw new Error(REQUIRE_OPTION_HAS_NO_ARGUMENT);
        currentArgs.split(',').forEach(arg => {
          options.require.push(arg);
        });
        break;
      default:
        options.testFiles.push(currentOption);
        break;
    }

    parseNextOption(input);
  };

  parseNextOption(processArgs);
  return options;
};
