const { miniTest, miniTestReport } = require('../util/mini-test')()
const assert = require('assert')
const createState = require('./state')

miniTest('createState returns action addTest', () => {
  const actions = createState()
  assert.strictEqual(Object.prototype.toString.call(actions.addTest), '[object Function]')
})

miniTest('createState returns action addTestWithOnly', () => {
  const actions = createState()
  assert.strictEqual(Object.prototype.toString.call(actions.addTestWithOnly), '[object Function]')
})

miniTest('createState returns action addTestWithSkip', () => {
  const actions = createState()
  assert.strictEqual(Object.prototype.toString.call(actions.addTestWithSkip), '[object Function]')
})

miniTest('createState returns action getState', () => {
  const actions = createState()
  assert.strictEqual(Object.prototype.toString.call(actions.getState), '[object Function]')
})

miniTest('addTest mutates the state.test', () => {
  const { addTest, getState } = createState()
  addTest('test')
  assert.strictEqual(getState().test.length, 1)
})

miniTest('addTestWithOnly mutates the state.only', () => {
  const { addTestWithOnly, getState } = createState()
  addTestWithOnly('test')
  assert.strictEqual(getState().only.length, 1)
})

miniTest('addTestWithSkip mutates the state.skip', () => {
  const { addTestWithSkip, getState } = createState()
  addTestWithSkip('test')
  assert.strictEqual(getState().skip.length, 1)
})

miniTestReport()
