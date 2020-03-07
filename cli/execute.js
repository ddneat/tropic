const path = require('path');
const parseOptions = require('../util/options');
const options = parseOptions(process.argv.slice(2));

options.require.forEach(module => {
  const localPath = module.slice(0, 2) === './' ? '' : 'node_modules';
  const joinedPath = path.join(process.cwd(), localPath, module);
  require(joinedPath);
});

options.testFiles.forEach(file => {
  require(path.join(process.cwd(), file));
});
