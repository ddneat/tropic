import test from '../../src/tropic';
import assert from 'assert';

test('custom script injected global function', () => {
  assert(global.injected());
});
