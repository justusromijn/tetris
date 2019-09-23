// Scene for HUD while playing (will listen to events from playscene for showing score, upcoming block, level)...
import { Scene } from "phaser";
import { getCoordinates } from "../../utils/coordinates";
import { grid } from "../../utils/grid";
import { addHudItem } from "../../utils/text";
import { play } from "../keys";

const labels = {
  score: "SCORE",
  level: "LEVEL"
};

export class HudScene extends Scene {
  constructor(config) {
    super(config);
    this.score = null;
    this.level = null;
    this.dimensions = getCoordinates();
  }
  create() {
    this.score = addHudItem(
      this,
      this.dimensions.center.x - (grid.width * grid.tile) / 2 - 20,
      this.dimensions.center.y - (grid.height * grid.tile) / 2,
      labels.score
    );
    this.scoreVal = addHudItem(
      this,
      this.dimensions.center.x - (grid.width * grid.tile) / 2 - 20,
      this.dimensions.center.y - (grid.height * grid.tile) / 2 + 40,
      0
    );

    this.level = addHudItem(
      this,
      this.dimensions.center.x - (grid.width * grid.tile) / 2 - 20,
      this.dimensions.center.y - (grid.height * grid.tile) / 2 + 100,
      labels.level
    );
    this.levelVal = addHudItem(
      this,
      this.dimensions.center.x - (grid.width * grid.tile) / 2 - 20,
      this.dimensions.center.y - (grid.height * grid.tile) / 2 + 140,
      0
    );
    this.scene.get(play).events.addListener("change", state => {
      this.scoreVal.setText(state.score);
      this.levelVal.setText(state.level);
    });
  }
}
