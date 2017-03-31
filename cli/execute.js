const fs = require('fs');
const path = require('path');
const parseArgs = require('./options');
const options = parseArgs(process.argv.slice(2));

options.require.forEach(module => {
  const relativeModulePath = path.isAbsolute(module) ? '' : 'node_modules';
  const joinedPath = path.join(process.cwd(), relativeModulePath, module);

  if (fs.existsSync(joinedPath)) {
    require(joinedPath);
    return;
  }

  try { // resolve global module
    require(module);
  } catch (e) {
    console.log(`Unable to resolve passed module: ${module}\n`);
    throw new Error(e);
  }
});

options.testFiles.forEach(file => {
  require(path.join(process.cwd(), file));
});
