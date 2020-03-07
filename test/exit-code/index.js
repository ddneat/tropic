const { miniTest, miniTestReport } = require('../../util/mini-test')()
const { passingCount, failingCount, runFiles } = require('../helper')
const assert = require('assert')

const files = [
  {
    id: 'all-pass',
    path: 'test-pass.js',
    args: []
  }, {
    id: 'all-fail',
    path: 'test-fail.js',
    args: []
  }, {
    id: 'some-pass-one-fail',
    path: 'test-pass-fail.js',
    args: []
  }, {
    id: 'some-exception',
    path: 'test-exception.js',
    args: []
  }, {
    id: 'some-missspelled-require',
    path: 'test-pass.js',
    args: ['--require=missspelled']
  }
]
const output = runFiles(files, './test/exit-code')

miniTest('all-pass should have exit code 0', () => {
  const testFile = output['all-pass']
  console.log(testFile)
  assert.strictEqual(testFile.status, 0)
  assert.strictEqual(passingCount(testFile.stdout), 3)
  assert.strictEqual(failingCount(testFile.stdout), 0)
})

miniTest('all-fail should have exit code 1', () => {
  const testFile = output['all-fail']
  assert.strictEqual(testFile.status, 1)
  assert.strictEqual(passingCount(testFile.stdout), 0)
  assert.strictEqual(failingCount(testFile.stdout), 1)
})

miniTest('some-pass-one-fail should have exit code 1', () => {
  const testFile = output['some-pass-one-fail']
  assert.strictEqual(testFile.status, 1)
  assert.strictEqual(passingCount(testFile.stdout), 2)
  assert.strictEqual(failingCount(testFile.stdout), 1)
})

miniTest('some-exception should have exit code 1', () => {
  const testFile = output['some-exception']
  assert.strictEqual(testFile.status, 1)
  assert.strictEqual(passingCount(testFile.stdout), 0)
  assert.strictEqual(failingCount(testFile.stdout), 0)
})

miniTest('some-missspelled-require should have exit code 1', () => {
  const testFile = output['some-missspelled-require']
  assert.strictEqual(testFile.status, 1)
  assert.strictEqual(passingCount(testFile.stdout), 0)
  assert.strictEqual(failingCount(testFile.stdout), 0)
})

miniTestReport()
