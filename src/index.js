import { Game } from "phaser";
import {
  GameOverScene,
  HighscoresScene,
  HudScene,
  InstructionsScene,
  MenuScene,
  PlayScene
} from "./scenes";
import {
  game_over,
  highscores,
  hud,
  instructions,
  menu,
  play
} from "./scenes/keys";
import { createCoordinates } from "./utils/coordinates";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
createCoordinates(width, height);

function preload() {
  this.load.multiatlas("assets", "assets/assets.json", "assets");
}
function create() {
  this.scene.start(menu);
}

let game = new Game({
  type: Phaser.AUTO,
  width,
  height,
  scene: {
    preload,
    create
  }
});

game.scene.add(menu, MenuScene);
game.scene.add(play, PlayScene);
game.scene.add(hud, HudScene);
game.scene.add(instructions, InstructionsScene);
game.scene.add(game_over, GameOverScene);
game.scene.add(highscores, HighscoresScene);
