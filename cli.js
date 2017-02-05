#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const spawnSync = require('child_process').spawnSync;
const { createWatcher } = require('./watcher');

const logStartFile = name => {
  console.log(`\n${path.join(process.cwd(), name)} ${new Date()}`);
};

const logEndFile = name => {
  console.log(`End ${name} ${new Date()}`);
};

const isWatch = arg => arg === '--watch';
const shouldBeWatched = process.argv.slice(2).some(arg => isWatch(arg));
const testFiles = process.argv.slice(2).filter(arg => !isWatch(arg));

const execTests = () => {
  testFiles.forEach(testFile => {
    logStartFile(testFile);
    spawnSync(process.argv[0], [testFile], { stdio: 'inherit' });
    logEndFile(testFile);
  });
};

if (shouldBeWatched) {
  createWatcher(fs, setInterval, () => {
    execTests();
  });
}

execTests();
