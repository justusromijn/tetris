import { Game } from "phaser";
import { HudScene } from "./scenes/hud";
import { MenuScene } from "./scenes/menu";
import { PlayScene } from "./scenes/play";
import { calculateBoundaries } from "./utils/calculateBoundaries";

const HEIGHT = document.body.clientHeight;
const WIDTH = document.body.clientWidth;
const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const TILE_SIZE = 32;

function preload() {
  this.load.multiatlas("assets", "assets/assets.json", "assets");
}
function create() {
  this.dimensions = calculateBoundaries(this.sys, {
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    tile: TILE_SIZE
  });
  this.scene.start("Menu", {
    dimensions: this.dimensions,
    grid: {
      width: GRID_WIDTH,
      height: GRID_HEIGHT,
      tile_size: TILE_SIZE
    }
  });
}

let game = new Game({
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: {
    preload,
    create
  }
});

game.scene.add("Menu", MenuScene);
game.scene.add("Play", PlayScene);
game.scene.add("Hud", HudScene);
