import Phaser from 'phaser'

import Game from './scenes/Game'

// const config: Phaser.Types.Core.GameConfig = {
//   type: Phaser.AUTO,
//   parent: 'phaser-container',
//   backgroundColor: '#282c34',
//   scale: {
//     mode: Phaser.Scale.ScaleModes.RESIZE,
//     width: window.innerWidth,
//     height: window.innerHeight,
//   },
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 200 },
//     },
//   },
//   scene: [Game],
// }

const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  backgroundColor: '#fcdbda',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1014,
    height: 773,
    min: {
      width: 1014,
      height: 773,
    },
    
    // width: window.innerWidth,
    // height: window.innerHeight,
  },

  scene: [Game]
};

// export default new Phaser.Game(GAME_CONFIG)
