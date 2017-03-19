const test = require('../src/tropic');

test('should pass: returns a promise which resolves', () => {
  return new Promise((resolve) => {
    resolve();
  });
});

test('should fail: returns a promise which rejects after timeout', () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('already timeout');
      reject();
    }, 30);
  });
});

test('should fail: returns a promise which rejects within timeout', () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('test file: inside promise');
      reject();
    }, 10);
  });
});

test('should fail: returns a promise and expects done callback', (done) => {
  return new Promise();
});

test('should fail: returns a promise which will neither resolve nor reject', () => {
  return new Promise();
});

test('should pass: returns a resolved promise', () => {
  return Promise.resolve();
});
