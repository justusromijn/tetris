// Scene for HUD while playing (will listen to events from playscene for showing score, upcoming block, level)...
import { Scene } from "phaser";
import { getCoordinates } from "../../utils/coordinates";
import { addText } from "../../utils/text";
import { menu } from "../keys";

export class HighscoresScene extends Scene {
  constructor(config) {
    super(config);
    this.dimensions = getCoordinates();
  }

  create() {
    this.enter = this.input.keyboard.addKey("ENTER");
    this.enter.on("down", this.onEnter.bind(this));
    this.highScores = JSON.parse(localStorage.getItem("highscores")) || [];

    this.header = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y - 300,
      [{ text: "HIGHSCORES", style: "title" }]
    );
    this.highScoreNames = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y - 200,
      this.highScores.map(({ name }) => ({
        text: name,
        style: "label"
      }))
    );

    this.highScoreValues = addText(
      this,
      this.dimensions.center.x + 200,
      this.dimensions.center.y - 200,
      this.highScores.map(({ score }) => ({
        text: score,
        style: "value"
      }))
    );

    this.outro = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y + 200,
      [
        {
          text: "Press <ENTER> to return to menu"
        }
      ]
    );
  }

  onEnter() {
    this.scene.start(menu);
  }
}
