const cp = require('child_process')
const path = require('path')

const extractCount = matches => {
  if (matches && matches.length > 1) {
    console.log('Invalid reporting')
  }
  return matches === null ? 0 : parseInt(matches[matches.length - 1].match(/\d*/))
}

const clearColors = (matches) => {
  return matches.map(line => line
    .replace('✓\u001b[0m \u001b[36m', '')
    .replace('\u001b[0m', '')
  )
}

const passingCount = str => extractCount(str.match(/\d* passing/g))
const failingCount = str => extractCount(str.match(/\d* failing/g))
const passingLines = str => clearColors(str.match(/\✓(.*)/g))

const runDirectories = directories => {
  directories.forEach(dir => {
    cp.spawnSync(process.argv[0], [`./test/${dir}`], { stdio: 'inherit' })
  })
}

const runFiles = (files, basePath) => {
  const output = {}
  files.forEach(file => {
    const childArgs = ['./cli', path.join(basePath, file.path)]
    file.args.forEach(arg => childArgs.push(arg))
    const child = cp.spawnSync(
      process.argv[0],
      childArgs,
      { stdio: ['pipe', 'pipe', process.stderr] }
    )
    output[file.id || file.path] = {
      status: child.status,
      stdout: String(child.stdout)
    }
  })
  return output
}

module.exports = {
  passingLines,
  passingCount,
  failingCount,
  runFiles,
  runDirectories
}
