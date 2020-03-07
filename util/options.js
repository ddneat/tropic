const REQUIRE_OPTION_HAS_NO_ARGUMENT = '--require option passed without any argument. e.g.: "--require=babel-register"'
const TIMEOUT_OPTION_HAS_NO_ARGUMENT = '--timeout option passed without any argument. e.g.: "--timeout=20"'

module.exports = (processArgs) => {
  const options = {
    isWatchMode: false,
    timeout: 200,
    require: [],
    testFiles: []
  }

  const parseNextOption = input => {
    if (input.length === 0) return
    const current = input.shift().split('=')
    const currentOption = current[0]
    const currentArgs = current[1]

    switch (currentOption) {
      case '--watch':
        options.isWatchMode = true
        break
      case '--require':
        if (!currentArgs) throw new Error(REQUIRE_OPTION_HAS_NO_ARGUMENT)
        currentArgs.split(',').forEach(arg => {
          options.require.push(arg)
        })
        break
      case '--timeout':
        if (!currentArgs) throw new Error(TIMEOUT_OPTION_HAS_NO_ARGUMENT)
        options.timeout = parseInt(currentArgs)
        break
      default:
        options.testFiles.push(currentOption)
        break
    }

    parseNextOption(input)
  }

  parseNextOption(processArgs)
  return options
}
