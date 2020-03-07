const test = require('../src/tropic')
const assert = require('assert')

test.skip('should pass: assert does not throw', () => {
  assert(true)
})

test.skip('should fail: assert throws', () => {
  assert(false)
})
