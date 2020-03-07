const { miniTest, miniTestReport } = require('../../util/mini-test')()
const { passingCount, failingCount, runFiles } = require('../helper')
const assert = require('assert')

const files = [
  {
    id: 'pass-timeout-40ms',
    path: 'test-done-30ms.js',
    args: ['--timeout=40']
  }, {
    id: 'fail-timeout-5ms',
    path: 'test-done-30ms.js',
    args: ['--timeout=5']
  }, {
    id: 'fail-default-timeout',
    path: 'test-done-210ms.js',
    args: []
  }, {
    id: 'pass-default-timeout',
    path: 'test-done-30ms.js',
    args: []
  }
]

const output = runFiles(files, './test/timeout')

miniTest('pass-timeout-40ms', () => {
  const testFile = output['pass-timeout-40ms']
  assert.strictEqual(testFile.status, 1)
  assert.strictEqual(passingCount(testFile.stdout), 1)
  assert.strictEqual(failingCount(testFile.stdout), 0)
})

miniTest('fail-timeout-5ms', () => {
  const testFile = output['fail-timeout-5ms']
  assert.strictEqual(testFile.status, 1)
  assert.strictEqual(passingCount(testFile.stdout), 0)
  assert.strictEqual(failingCount(testFile.stdout), 1)
})

miniTest('fail-default-timeout', () => {
  const testFile = output['fail-default-timeout']
  assert.strictEqual(testFile.status, 1)
  assert.strictEqual(passingCount(testFile.stdout), 0)
  assert.strictEqual(failingCount(testFile.stdout), 1)
})

miniTest('pass-default-timeout', () => {
  const testFile = output['pass-default-timeout']
  assert.strictEqual(testFile.status, 1)
  assert.strictEqual(passingCount(testFile.stdout), 1)
  assert.strictEqual(failingCount(testFile.stdout), 0)
})

miniTestReport()
