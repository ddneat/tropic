const { miniTest, miniTestReport, createSpy } = require('../util/mini-test')()
const assert = require('assert')
const { isHiddenDirectory, createWatcher } = require('./watcher')

miniTest('isHiddenDirectory returns true when .idea', () => {
  assert.strictEqual(isHiddenDirectory('.idea/some/file'), true)
})

miniTest('isHiddenDirectory returns true when nested hidden folder', () => {
  assert.strictEqual(isHiddenDirectory('some/.hidden/file'), true)
})

miniTest('isHiddenDirectory returns true when multiple nested hidden folders', () => {
  assert.strictEqual(isHiddenDirectory('some/.hidden/.another/file'), true)
})

miniTest('isHiddenDirectory returns false when no hidden folder', () => {
  assert.strictEqual(isHiddenDirectory('some/file'), false)
})

const callCreateWatcher = () => {
  const fs = { watch: createSpy() }
  const setInterval = createSpy()
  const callback = createSpy()

  createWatcher(fs, setInterval, callback)

  return {
    fsWatchArgs: fs.watch.args,
    createSetInterval: setInterval.args,
    callbackArgs: callback.args
  }
}

const callCreateWatcherWithSpy = () => {
  const fsSpy = { watch: createSpy() }
  const createSetIntervalSpy = createSpy()
  const callbackSpy = createSpy()

  return {
    fsSpy,
    createSetIntervalSpy,
    callbackSpy
  }
}

miniTest('createWatch calls watch once', () => {
  const { fsWatchArgs } = callCreateWatcher()
  assert.strictEqual(fsWatchArgs.length, 1)
})

miniTest('createWatch calls watch with three arguments', () => {
  const { fsWatchArgs } = callCreateWatcher()
  assert.strictEqual(fsWatchArgs[0].length, 3)
})

miniTest('createWatch calls watch with root path', () => {
  const { fsWatchArgs } = callCreateWatcher()
  assert.strictEqual(fsWatchArgs[0][0], './')
})

miniTest('createWatch calls watch with recursive', () => {
  const { fsWatchArgs } = callCreateWatcher()
  assert.deepStrictEqual(fsWatchArgs[0][1], { recursive: true })
})

miniTest('createWatch calls watch with callback', () => {
  const { fsWatchArgs } = callCreateWatcher()
  assert.strictEqual(Object.prototype.toString.call(fsWatchArgs[0][2]), '[object Function]')
})

miniTest('createWatch calls createSetInterval once', () => {
  const { createSetInterval } = callCreateWatcher()
  assert.strictEqual(createSetInterval.length, 1)
})

miniTest('createWatch calls createSetInterval with two arguments', () => {
  const { createSetInterval } = callCreateWatcher()
  assert.strictEqual(createSetInterval[0].length, 2)
})

miniTest('createWatch calls createSetInterval with callback', () => {
  const { createSetInterval } = callCreateWatcher()
  assert.strictEqual(Object.prototype.toString.call(createSetInterval[0][0]), '[object Function]')
})

miniTest('createWatch calls createSetInterval with 5ms timeout', () => {
  const { createSetInterval } = callCreateWatcher()
  assert.strictEqual(createSetInterval[0][1], 5)
})

miniTest('callback is called with all the changed files', () => {
  const { fsSpy, createSetIntervalSpy, callbackSpy } = callCreateWatcherWithSpy()
  fsSpy.watch.callsArgWith(2, 'any', 'foo')
  fsSpy.watch.callsArgWith(2, 'change', 'bar')
  createSetIntervalSpy.callsArgWith(0)
  createWatcher(fsSpy, createSetIntervalSpy, callbackSpy)

  assert.deepStrictEqual(callbackSpy.args[0][0], ['foo', 'bar'])
})

miniTest('callback is not called without any change', () => {
  const { fsSpy, createSetIntervalSpy, callbackSpy } = callCreateWatcherWithSpy()
  createSetIntervalSpy.callsArgWith(0)
  createWatcher(fsSpy, createSetIntervalSpy, callbackSpy)

  assert.strictEqual(callbackSpy.args.length, 0)
})

miniTest('callback is not called on changes within hidden directories', () => {
  const { fsSpy, createSetIntervalSpy, callbackSpy } = callCreateWatcherWithSpy()
  fsSpy.watch.callsArgWith(2, 'any', '.idea/hidden/file')
  fsSpy.watch.callsArgWith(2, 'other', 'nested/.hidden/file')
  fsSpy.watch.callsArgWith(2, 'change', 'this/path/is/fine')
  createSetIntervalSpy.callsArgWith(0)
  createWatcher(fsSpy, createSetIntervalSpy, callbackSpy)

  assert.deepStrictEqual(callbackSpy.args[0][0], ['this/path/is/fine'])
})

miniTestReport()
