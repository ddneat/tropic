const test = require('./tropic');

test('test', () => {});
test.only('test.only', () => {});
test.skip('test.skip', () => {});
test.only.skip('test.only.skip', () => {});
test.skip.only.skip('test.skip.only.skip', () => {});
