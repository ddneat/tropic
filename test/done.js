const test = require('../src/tropic')
const assert = require('assert')

test('should pass: done called sync', (done) => {
  done()
})

test('should pass: done is called within 200ms', (done) => {
  setTimeout(() => {
    done()
  }, 10)
})

test('should fail: done is called after 200ms', (done) => {
  setTimeout(() => {
    done()
  }, 210)
})

test('should fail: done never called', (done) => {
})

test('should fail: done never called but assert throws', (done) => {
  assert(false)
})

test('should fail: done will be called but assert throws', (done) => {
  assert(false)
  done()
})
