module.exports = (addSuite, addSuiteWithOnly, addSuiteWithSkip) => {
  function suite(title, callback) {
    addSuite(title, callback)
  }

  suite.only = function (title, callback) {
    addSuiteWithOnly(title, callback)
  }

  suite.skip = function (title, callback) {
    addSuiteWithSkip(title, callback)
  }

  suite.skip.only = suite.only
  suite.only.skip = suite.skip

  return suite
}
