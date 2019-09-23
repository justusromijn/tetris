import { Game } from "phaser";
import { HudScene } from "./scenes/hud";
import { InstructionsScene } from "./scenes/instructions";
import { hud, instructions, menu, play } from "./scenes/keys";
import { MenuScene } from "./scenes/menu";
import { PlayScene } from "./scenes/play";
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
