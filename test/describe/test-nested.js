const { test, describe } = require('../../src/tropic')
const assert = require('assert')

test('basic', () => {
  assert(true)
})

describe('#1 with', () => {
  test('single', () => {
    assert(true)
  })
})

describe('#2 with', () => {
  test('a', () => {
    assert(true)
  })

  describe('one nested', () => {
    test('b', () => {
      assert(true)
    })
  })

  describe('two nested', () => {
    test('c', () => {
      assert(true)
    })

    test('d', () => {
      assert(true)
    })
  })
})
