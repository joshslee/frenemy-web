import Phaser from 'phaser'
import logoAltImg from '../assets/title-alt.png';
import logoImg from "../assets/title.png";
import WebFontFile from './WebFontFile'

// Config
import { 
  GAME_SUBTITLE,
  ETH_WALLET_PLACEHOLDER
} from "../utils/constants";
import { 
  getStyles
} from "../utils/styles.js";

export default class Game extends Phaser.Scene {

  constructor() {
    super({
      key: "Game"
    })
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'))
    this.load.image("title", logoImg);
  }

  create() {
    const centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    // ADD LOGO
    this.logo = this.add.image(
      centerX, 
      centerY - this.cameras.main.height / 4.5, 
      'title'
    );
    this.logo.displayWidth = this.game.config.width * 0.45;
    this.logo.scaleY = this.logo.scaleX;
    
    // ADD SUBTITLE
    this.add.text(
      centerX, 
      this.logo.y + 170, 
      GAME_SUBTITLE.toUpperCase(), 
      {
        ...getStyles({ type: "h1", style: { fontFamily: '"Press Start 2P"'}}),
      }
    ).setOrigin(0.5)


  }

  update() {
    
  }

}