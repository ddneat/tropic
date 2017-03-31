const babelRegister = process.argv[3];
const fileName = process.argv[2];

require(babelRegister)
require(process.cwd() + '/' + fileName);
