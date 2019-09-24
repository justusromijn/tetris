import { Scene } from "phaser";
import { getCoordinates } from "../../utils/coordinates";
import { addText } from "../../utils/text";
import { menu } from "../keys";

export class InstructionsScene extends Scene {
  constructor(config) {
    super(config);
    this.selectedItem = 0;
    this.dimensions = getCoordinates();
  }

  create() {
    if (!this.cursors) {
      this.enter = this.input.keyboard.addKey("ENTER");
      this.enter.on("down", this.onEnter.bind(this));
    }

    this.header = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y - 300,
      [{ text: "INSTRUCTIONS", style: "title" }]
    );
    this.controlsHeader = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y - 220,
      [{ text: "CONTROLS", style: "heading" }]
    );

    this.controls = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y - 160,
      [{ text: "<LEFT>\n<RIGHT>\n<DOWN>\n<UP>\n<SPACE>" }]
    );
    this.controlsExplanation = addText(
      this,
      this.dimensions.center.x - 100,
      this.dimensions.center.y - 160,
      [
        {
          text:
            "move current block to the left\nmove current block to the right\nmove current block down\nrotate current block\ndirectly drop the current block to the floor"
        }
      ]
    );
    this.scoreHeader = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y,
      [
        { text: "SCORE", style: "heading" },
        {
          text:
            "For each completed row you get points. If you complete multiple rows with a single block, you can generate bonus points."
        }
      ]
    );
    this.scoring = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y + 160,
      [{ text: "ONE ROW\nTWO ROWS\nTHREE ROWS\nFOUR ROWS\n" }]
    );
    this.scoringExplanation = addText(
      this,
      this.dimensions.center.x - 60,
      this.dimensions.center.y + 160,
      [{ text: "1 point\n3 points\n6 points\n10 points\n" }]
    );

    this.outro = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y + 300,
      [{ text: "Press <ENTER> to return to the menu" }]
    );
  }

  update() {}

  onEnter() {
    this.scene.start(menu);
  }
}
