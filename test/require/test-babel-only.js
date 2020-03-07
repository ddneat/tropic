import test from '../../src/tropic'
import assert from 'assert'

test('should pass: babel-register was loaded', () => {
  assert.strictEqual(1 + 2, 3)
})
