import { Game } from 'phaser';
import { PlayScene } from './scenes/play';
import { HudScene } from './scenes/hud';

let height = document.body.clientHeight;
let width = document.body.clientWidth;

const config = {
  type: Phaser.AUTO,
  width,
  height,
  scene: {
    preload,
    create,
    update
  }
};
function preload() {
  this.load.multiatlas('assets', 'assets/assets.json', 'assets');
}
function create() {
  this.scene.start('PlayScene');
  this.scene.start('HudScene');
}
function update() {}

let game = new Game(config);

game.scene.add('PlayScene', PlayScene);
game.scene.add('HudScene', HudScene);
