module.exports = (addTest, addTestWithOnly, addTestWithSkip) => {
  function test (title, callback) {
    addTest(title, callback)
  }

  test.only = function (title, callback) {
    addTestWithOnly(title, callback)
  }

  test.skip = function (title, callback) {
    addTestWithSkip(title, callback)
  }

  test.skip.only = test.only
  test.only.skip = test.skip

  return test
}
