const test = require('../../src/tropic')

test('resolves done after 10', (done) => {
  setTimeout(() => {
    done()
  }, 10)
})
