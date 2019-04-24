// Scene for HUD while playing (will listen to events from playscene for showing score, upcoming block, level)...
import { Scene } from 'phaser';

export class HudScene extends Scene {
  constructor(config) {
    super(config);
  }
  create() {
    console.log('HERE');
  }
}
