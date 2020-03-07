const test = require('../../src/tropic')

test('resolves done after 210', (done) => {
  setTimeout(() => {
    done()
  }, 210)
})
