module.exports = () => {
  const state = {
    test: [],
    only: [],
    skip: []
  }

  const addTest = (test) => state.test.push(test)
  const addTestWithOnly = (test) => state.only.push(test)
  const addTestWithSkip = (test) => state.skip.push(test)

  return {
    addTest,
    addTestWithOnly,
    addTestWithSkip,
    getState: () => state
  }
}
