const isHiddenDirectory = path => path.match(/(^\.)|(\/\.)/) !== null;

const createWatcher = (fs, createSetInterval, callback) => {
  const files = [];

  fs.watch('./', { recursive: true }, (eventType, filename) => {
    if (isHiddenDirectory(filename)) return;
    files.push(filename);
  });

  createSetInterval(() => {
    if (files.length === 0) return;
    callback(files.splice(0, files.length));
  }, 100);
};

module.exports = {
  isHiddenDirectory,
  createWatcher
};
