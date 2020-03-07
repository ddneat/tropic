module.exports = () => {
  const state = {
    iterations: []
  }

  const createIteration = () => {
    const iteration = {
      failCount: 0,
      passCount: 0,
      files: {}
    }

    state.iterations.push(iteration)

    const createFile = fileName => {
      if (!iteration.files[fileName]) {
        iteration.files[fileName] = {
          code: 1,
          pass: [],
          fail: [],
          report: []
        }
      }
    }

    return {
      addPass: (fileName, title) => {
        iteration.passCount += 1
        createFile(fileName)
        iteration.files[fileName].pass.push({ title })
      },
      addFail: (fileName, title, error) => {
        iteration.failCount += 1
        createFile(fileName)
        iteration.files[fileName].fail.push({ title, error })
      },
      addReport: (fileName, meta) => {
        createFile(fileName)
        iteration.files[fileName].report.push(meta)
      },
      setCode: (fileName, value) => {
        createFile(fileName)
        iteration.files[fileName].code = value
      }
    }
  }

  return {
    createIteration,
    getState: () => state
  }
}
