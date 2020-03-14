const { miniTest, miniTestReport } = require('../../util/mini-test')()
const { passingCount, failingCount, passingLines, runFiles } = require('../helper')
const assert = require('assert')

const files = [
  {
    id: 'nested',
    path: 'test-nested.js',
    args: []
  }
]

const output = runFiles(files, './test/describe')

miniTest('nested should have exit code 0 with 6 passing tests', () => {
  const testFile = output['nested']
  assert.strictEqual(testFile.status, 0)
  assert.strictEqual(passingCount(testFile.stdout), 6)
  assert.strictEqual(failingCount(testFile.stdout), 0)
  assert.deepStrictEqual(passingLines(testFile.stdout), [
    'basic',
    '#1 with single',
    '#2 with a',
    '#2 with one nested b',
    '#2 with two nested c',
    '#2 with two nested d'
  ])
})

miniTestReport()
