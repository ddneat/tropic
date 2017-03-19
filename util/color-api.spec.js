const { miniTest, miniTestReport } = require('./mini-test')();
const assert = require('assert');
const colorApi = require('./color-api');

miniTest('colorApi returns black', () => {
  assert.equal(typeof colorApi.black, 'function');
  assert.equal(colorApi.black('text'), '\x1B[30mtext\x1B[0m');
});

miniTest('colorApi returns red', () => {
  assert.equal(typeof colorApi.red, 'function');
  assert.equal(colorApi.red('text'), '\x1B[31mtext\x1B[0m');
});

miniTest('colorApi returns green', () => {
  assert.equal(typeof colorApi.green, 'function');
  assert.equal(colorApi.green('text'), '\x1B[32mtext\x1B[0m');
});

miniTest('colorApi returns yellow', () => {
  assert.equal(typeof colorApi.yellow, 'function');
  assert.equal(colorApi.yellow('text'), '\x1B[33mtext\x1B[0m');
});

miniTest('colorApi returns blue', () => {
  assert.equal(typeof colorApi.blue, 'function');
  assert.equal(colorApi.blue('text'), '\x1B[34mtext\x1B[0m');
});

miniTest('colorApi returns magenta', () => {
  assert.equal(typeof colorApi.magenta, 'function');
  assert.equal(colorApi.magenta('text'), '\x1B[35mtext\x1B[0m');
});

miniTest('colorApi returns cyan', () => {
  assert.equal(typeof colorApi.cyan, 'function');
  assert.equal(colorApi.cyan('text'), '\x1B[36mtext\x1B[0m');
});

miniTest('colorApi returns white', () => {
  assert.equal(typeof colorApi.white, 'function');
  assert.equal(colorApi.white('text'), '\x1B[37mtext\x1B[0m');
});

const background = [
  '30-40-blackBlackBackground',
  '30-41-blackRedBackground',
  '30-42-blackGreenBackground',
  '30-43-blackYellowBackground',
  '30-44-blackBlueBackground',
  '30-45-blackMagentaBackground',
  '30-46-blackCyanBackground',
  '30-47-blackWhiteBackground',

  '31-40-redBlackBackground',
  '31-41-redRedBackground',
  '31-42-redGreenBackground',
  '31-43-redYellowBackground',
  '31-44-redBlueBackground',
  '31-45-redMagentaBackground',
  '31-46-redCyanBackground',
  '31-47-redWhiteBackground',

  '32-40-greenBlackBackground',
  '32-41-greenRedBackground',
  '32-42-greenGreenBackground',
  '32-43-greenYellowBackground',
  '32-44-greenBlueBackground',
  '32-45-greenMagentaBackground',
  '32-46-greenCyanBackground',
  '32-47-greenWhiteBackground',

  '33-40-yellowBlackBackground',
  '33-41-yellowRedBackground',
  '33-42-yellowGreenBackground',
  '33-43-yellowYellowBackground',
  '33-44-yellowBlueBackground',
  '33-45-yellowMagentaBackground',
  '33-46-yellowCyanBackground',
  '33-47-yellowWhiteBackground',

  '34-40-blueBlackBackground',
  '34-41-blueRedBackground',
  '34-42-blueGreenBackground',
  '34-43-blueYellowBackground',
  '34-44-blueBlueBackground',
  '34-45-blueMagentaBackground',
  '34-46-blueCyanBackground',
  '34-47-blueWhiteBackground',

  '35-40-magentaBlackBackground',
  '35-41-magentaRedBackground',
  '35-42-magentaGreenBackground',
  '35-43-magentaYellowBackground',
  '35-44-magentaBlueBackground',
  '35-45-magentaMagentaBackground',
  '35-46-magentaCyanBackground',
  '35-47-magentaWhiteBackground',

  '36-40-cyanBlackBackground',
  '36-41-cyanRedBackground',
  '36-42-cyanGreenBackground',
  '36-43-cyanYellowBackground',
  '36-44-cyanBlueBackground',
  '36-45-cyanMagentaBackground',
  '36-46-cyanCyanBackground',
  '36-47-cyanWhiteBackground',

  '37-40-whiteBlackBackground',
  '37-41-whiteRedBackground',
  '37-42-whiteGreenBackground',
  '37-43-whiteYellowBackground',
  '37-44-whiteBlueBackground',
  '37-45-whiteMagentaBackground',
  '37-46-whiteCyanBackground',
  '37-47-whiteWhiteBackground'
];

background.forEach(item => {
  const color = item.split('-');
  miniTest(`colorApi returns ${color[2]}`, () => {
    assert.equal(typeof colorApi[color[2]], 'function');
    assert.equal(colorApi[color[2]]('text'), `\x1B[${color[0]};${color[1]}mtext\x1B[0m`);
  });
});

miniTest('colorApi has 64 background methods', () => {
  assert.equal(background.length, 64);
});

miniTestReport();
