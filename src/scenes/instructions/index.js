import { Scene } from "phaser";
import { getCoordinates } from "../../utils/coordinates";
import { addMultilineText } from "../../utils/text";
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

    this.instructions = addMultilineText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y - 300,
      [
        { text: "INSTRUCTIONS", type: "title" },
        { text: "CONTROLS", type: "heading" },
        {
          text:
            "Use <LEFT>, <RIGHT> and <DOWN> arrow keys to move the block. Use <UP> arrow key to rotate. Use <SPACE> to directly drop the current block to the floor.",
          type: "text"
        },
        { text: "SCORE", type: "heading" },
        {
          text:
            "For a single row you get 1 point. If you complete 2 rows with one block, you get 3 points. For 3 rows you get 6 points, and 4 rows yields 10 points.",
          type: "text"
        },
        { text: "LEVEL", type: "heading" },
        {
          text:
            "After a certain amount of points you will advance a level. This means that the blocks will drop a bit faster by themselves.",
          type: "text"
        },
        {
          text: "Press <ENTER> to return to the menu.",
          type: "text"
        }
      ]
    );
    // this.dimensions.center.x,
    // this.dimensions.center.y + BASE_OFFSET + index * (FONT.size + 10),
  }

  update() {}

  onEnter() {
    this.scene.start(menu);
  }
}
