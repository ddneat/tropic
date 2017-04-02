const cp = require('child_process');
const path = require('path');

const extractCount = matches => {
  if (matches && matches.length > 1) {
    console.log('Invalid reporting');
  }
  return matches === null ? null : parseInt(matches[matches.length - 1].match(/\d*/));
};

const passingCount = str => extractCount(str.match(/\d* passing/g));
const failingCount = str => extractCount(str.match(/\d* failing/g));

const runDirectories = directories => {
  directories.forEach(dir => {
    cp.spawnSync(process.argv[0], [`./test/${dir}`], { stdio: 'inherit' });
  });
};

const runFiles = (files, basePath) => {
  const output = {};
  files.forEach(file => {
    const childArgs = ['./cli', path.join(basePath, file.path)];
    file.args.forEach(arg => childArgs.push(arg));
    const child = cp.spawnSync(
      process.argv[0],
      childArgs,
      { stdio: ['pipe', 'pipe', process.stderr] }
    );
    output[file.path] = String(child.stdout);
  });
  return output;
};

module.exports = {
  passingCount,
  failingCount,
  runFiles,
  runDirectories
};
