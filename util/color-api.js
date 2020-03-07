const api = {}
const colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']
const capitalize = (str) => (str.charAt(0).toUpperCase() + str.slice(1))
colors.forEach((color, i) => {
  api[color] = (str) => `\x1B[3${i}m${str}\x1B[0m`
  colors.forEach((background, k) => {
    api[`${color}${capitalize(background)}Background`] = (str) => `\x1B[3${i};4${k}m${str}\x1B[0m`
  })
})

// black()
// blackWhiteBackground()

module.exports = api
