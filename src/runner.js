const createErrorMessages = (SLOW) => {
  return {
    NOT_RESOLVED: `Not resolved within ${SLOW}ms`,
    DONE_NOT_CALLED: `Done callback not called within ${SLOW}ms`,
    PROMISE_OR_DONE: 'Tests which have a done callback as first argument should never return a promise'
  }
}

const isError = variable => Object.prototype.toString.call(variable) === '[object Error]'

const stringifyError = (error, filter) => {
  if (!isError(error)) return error
  const plainObject = {}
  Object.getOwnPropertyNames(error).forEach(key => {
    plainObject[key] = error[key]
  })
  return JSON.stringify(plainObject, filter)
}

const isPromise = (fn) => (fn && typeof fn.then === 'function')

const callWithDoneCallback = (test, logPass, logFail, errorMessages, SLOW) => {
  const { DONE_NOT_CALLED, PROMISE_OR_DONE } = errorMessages
  const onResolve = () => logPass(test.title)
  const onReject = (error) => {
    logFail(test.title, stringifyError(error))
  }

  const rejectWhenPromise = (maybePromise, reject) => {
    if (isPromise(maybePromise)) {
      maybePromise.catch(() => {})
      reject()
    }
  }

  new Promise((resolve, reject) => {
    const resolveTimeout = setTimeout(() => {
      reject(DONE_NOT_CALLED)
    }, SLOW)

    const done = () => {
      clearTimeout(resolveTimeout)
      resolve()
    }

    const clearAndRejectPromiseOrDone = () => {
      clearTimeout(resolveTimeout)
      reject(PROMISE_OR_DONE)
    }

    rejectWhenPromise(test.callback(done), clearAndRejectPromiseOrDone)
  }).then(onResolve).catch(onReject)
}

const resolveAsPromise = (test, logPass, logFail, errorMessages, SLOW) => {
  const { NOT_RESOLVED } = errorMessages
  let resolveTimeout = setTimeout(() => {
    logFail(test.title, NOT_RESOLVED)
    resolveTimeout = null
  }, SLOW)

  const clearAndPass = () => {
    if (!resolveTimeout) {
      return
    }
    clearTimeout(resolveTimeout)
    resolveTimeout = null
    logPass(test.title)
  }

  const clearAndFail = (error) => {
    if (!resolveTimeout) {
      return
    }
    clearTimeout(resolveTimeout)
    resolveTimeout = null
    logFail(test.title, stringifyError(error))
  }

  // Promise.resolve(test.callback()).then(clearAndPass).catch(clearAndFail);

  let maybePromise
  try {
    maybePromise = test.callback()
  } catch (error) {
    return clearAndFail(error)
  }

  if (isPromise(maybePromise)) {
    return maybePromise
      .then(() => clearAndPass())
      .catch(clearAndFail)
  }

  clearAndPass(test.title)
}

const isTestExpectingDoneCallback = (test) => test.callback.length >= 1

const createRunner = (logPass, logFail, logReport, options) => {
  const { timeout } = options || {}
  if (!timeout) throw new Error('Runner is missing arg "timeout".')
  const errorMessages = createErrorMessages(timeout)
  function runTests (tests) {
    const promises = []
    const curryResolve = (resolve, callback) => (...args) => {
      callback(...args) // eslint-disable-line standard/no-callback-literal
      resolve()
    }
    tests.forEach((test) => {
      promises.push(new Promise(resolve => {
        const logPassWithResolve = curryResolve(resolve, logPass)
        const logFailWithResolve = curryResolve(resolve, logFail)
        isTestExpectingDoneCallback(test)
          ? callWithDoneCallback(test, logPassWithResolve, logFailWithResolve, errorMessages, timeout)
          : resolveAsPromise(test, logPassWithResolve, logFailWithResolve, errorMessages, timeout)
      }))
    })
    return Promise.all(promises)
  }

  return (state) => {
    const tests = state.only.length ? state.only : state.test

    const allResolved = () => {
      logReport({
        executedCount: tests.length,
        allTestsLength: state.test.length + state.only.length + state.skip.length,
        onlyLength: state.only.length,
        skipLength: state.skip.length
      })
    }

    runTests(tests).then(allResolved)
  }
}

module.exports = {
  createRunner,
  callWithDoneCallback,
  resolveAsPromise
}
