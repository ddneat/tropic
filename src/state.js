module.exports = () => {
  const createState = () => {
    return {
      suites: [],
      suitesWithOnly: [],
      suitesWithSkip: [],
      tests: [],
      testsWithOnly: [],
      testsWithSkip: []
    }
  }

  const root = createState()
  let current = root

  const createAddToState = (key) => (name, cb) => {
    const children = createState()
    current[key].push({ name, cb, children })
    return { current, children }
  }

  const resolveChildren = (next) => {
    next.suites.forEach((suite) => {
      current = suite.children
      suite.cb()
      resolveChildren(current)
    })
    next.tests.forEach((test) => {
      current = test.children
      resolveChildren(current)
    })
    return next
  }

  return {
    addTest: createAddToState('tests'),
    addTestWithOnly: createAddToState('testsWithOnly'),
    addTestWithSkip: createAddToState('testsWithSkip'),
    addSuite: createAddToState('suites'),
    addTestWithOnly: createAddToState('suitesWithOnly'),
    addTestWithSkip: createAddToState('suitesWithSkip'),
    setCurrent: (children) => current = children,
    resolveState: () => resolveChildren(root)
  }
}
