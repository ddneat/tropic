function logFail (message, error) {
  console.error('\x1B[31m' + 'Failed: ' + message + '\x1B[0m');
  console.error(error);
}

function logPass (message) {
  console.log('\x1B[32m' + 'Passed: ' + message + '\x1B[0m');
}

function logReport (executedCount, allTestsLength, onlyLength, skipLength) {
  console.log(
    'Exec: ' + executedCount,
    ' Available Tests: ' + allTestsLength,
    ' Only: ' + onlyLength,
    ' Skip: ' + skipLength
  );
}

module.exports = {
  logPass,
  logFail,
  logReport
};
