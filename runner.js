const SLOW = 20;
const NOT_RESOLVED = `Not resolved within ${SLOW}ms`;
const DONE_NOT_CALLED = `Done callback not called within ${SLOW}ms`;
const PROMISE_OR_DONE = 'Tests which have a done callback as first argument should never return a promise';

const isObject = variable => Object.prototype.toString.call(variable) === '[object Object]';

const stringifyError = (error, filter) => {
	if (!isObject(error)) return error;
  const plainObject = {};
  Object.getOwnPropertyNames(error).forEach(key => {
    plainObject[key] = error[key];
  });
  return JSON.stringify(plainObject, filter);
};

const isPromise = (fn) => (fn && typeof fn.then === 'function');

const callWithDoneCallback = (test, logPass, logFail) => {
  const onResolve = () => logPass(test.title);
  const onReject = (error) => {
    logFail(test.title, stringifyError(error));
  };

  const rejectWhenPromise = (maybePromise, reject) => {
    if (isPromise(maybePromise)) {
      maybePromise.catch(() => {});
      reject();
    }
  };

  new Promise((resolve, reject) => {
    const resolveTimeout = setTimeout(() => {
      reject(DONE_NOT_CALLED);
    }, SLOW);

    const done = () => {
      clearTimeout(resolveTimeout);
      resolve();
    };

    const clearAndRejectPromiseOrDone = () => {
      clearTimeout(resolveTimeout);
      reject(PROMISE_OR_DONE);
    };

    rejectWhenPromise(test.callback(done), clearAndRejectPromiseOrDone);
  }).then(onResolve).catch(onReject);
};

const resolveAsPromise = (test, logPass, logFail) => {
  let resolveTimeout = setTimeout(() => {
    logFail(test.title, NOT_RESOLVED);
    resolveTimeout = null;
  }, SLOW);

  const clearAndPass = () => {
    if (!resolveTimeout) {
      return;
    }
    clearTimeout(resolveTimeout);
    resolveTimeout = null;
    logPass(test.title);
  };

  const clearAndFail = (error) => {
    if (!resolveTimeout) {
      return;
    }
    clearTimeout(resolveTimeout);
    resolveTimeout = null;
    logFail(test.title, stringifyError(error));
  };

	//	Promise.resolve(test.callback()).then(clearAndPass).catch(clearAndFail);
	
  let maybePromise;
  try {
    maybePromise = test.callback();
  } catch (error) {
    return clearAndFail(error);
  }
  
  if (isPromise(maybePromise)) {
    return maybePromise
      .then(() => clearAndPass())
      .catch(clearAndFail);
  }
  
  clearAndPass(test.title);
};

const isTestExpectingDoneCallback = (test) => test.callback.length >= 1;

const createRunner = (logPass, logFail, logReport) => {
  function runTests (tests) {
    tests.forEach((test) => {
      isTestExpectingDoneCallback(test)
        ? callWithDoneCallback(test, logPass, logFail)
        : resolveAsPromise(test, logPass, logFail);
    });
  }

  return (state) => {
    const tests = state.only.length ? state.only : state.test;
    runTests(tests);

    logReport({
      executedCount: tests.length,
      allTestsLength: state.test.length + state.only.length + state.skip.length,
      onlyLength: state.only.length,
      skipLength: state.skip.length
    });
  };
};

module.exports = {
  createRunner,
  callWithDoneCallback,
  resolveAsPromise
};
