const fs = require('fs')
const createState = require('./state')
const createTest = require('./test')
const createSuite = require('./suite')
const { createRunner } = require('./runner')
const parseOptions = require('../util/options')
const options = parseOptions(process.argv.slice(2))

const logStream = fs.createWriteStream(null, { fd: 4 })
const write = obj => logStream.write(JSON.stringify(obj) + '--tropic_delimiter--')

const logPass = (title) => {
  write({ type: 'pass', title: title })
}

const logFail = (title, error) => {
  write({ type: 'fail', title: title, error: error })
}

const logReport = (payload) => {
  write({ type: 'report', payload })
  logStream.end()
}

const {
  addTest,
  addTestWithOnly,
  addTestWithSkip,
  addSuite,
  addSuiteWithOnly,
  addSuiteWithSkip,
  resolveState,
} = createState()

const execWithState = createRunner(logPass, logFail, logReport, options)
const test = createTest(addTest, addTestWithOnly, addTestWithSkip)
const describe = createSuite(addSuite, addSuiteWithOnly, addSuiteWithSkip)

process.once('beforeExit', () => {
  execWithState(resolveState())
})

module.exports = {
  ...test,
  test,
  describe,
}
