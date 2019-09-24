// Scene for HUD while playing (will listen to events from playscene for showing score, upcoming block, level)...
import { Scene } from "phaser";
import { getCoordinates } from "../../utils/coordinates";
import { addText } from "../../utils/text";
import { highscores, menu } from "../keys";

const ALLOWED_CHARS = "0123456789abcdefghijklmnopqrstuvwxyz ?!._";

export class GameOverScene extends Scene {
  constructor(config) {
    super(config);
    this.dimensions = getCoordinates();
  }

  create({ score }) {
    this.name = "";
    this.score = score;
    this.highScores = JSON.parse(localStorage.getItem("highscores")) || [];

    if (
      this.highScores.length < 5 ||
      this.highScores.some(highScore => score > highScore.score)
    ) {
      this.addHighScore();
    } else {
      this.gameOverNotification = addText(
        this,
        this.dimensions.center.x - 200,
        this.dimensions.center.y - 300,
        [
          { text: "GAME OVER", style: "title" },
          { text: `SCORE: ${score}`, style: "heading" },
          { text: `Press <ENTER> to return to the menu.`, style: "text" }
        ]
      );
      this.input.keyboard.on("keydown", event => {
        if (event.key === "Enter") {
          this.scene.start(menu);
        }
      });
    }
  }
  addHighScore() {
    this.events.on("shutdown", () => {
      this.timer && clearTimeout(this.timer);
    });
    this.cursor = this.add.rectangle(
      this.dimensions.center.x - 200,
      this.dimensions.center.y - 68,
      12,
      20,
      0xf9f9f9,
      1
    );
    this.toggleCursor();
    this.userInput = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y - 100,
      [{ text: this.name, style: "label" }]
    );
    this.scoreValue = addText(
      this,
      this.dimensions.center.x + 200,
      this.dimensions.center.y - 100,
      [{ text: this.score, style: "value" }]
    );
    this.gameOverNotification = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y - 300,
      [
        { text: "GAME OVER", style: "title" },
        {
          text: `Congratulations, a new highscore! Such wow! Enter your name and press <ENTER> to submit your highscore to the list.`,
          style: "text",
          centered: false
        }
      ]
    );

    this.input.keyboard.on("keydown", event => {
      if (ALLOWED_CHARS.includes(event.key.toLowerCase())) {
        this.name = (this.name += event.key).slice(0, 24);
        this.userInput[0].setText(this.name);
        this.cursor.setX(
          this.dimensions.center.x - 200 + this.userInput[0].width + 5
        );
      } else if (event.key === "Backspace") {
        this.name = this.name.substring(0, this.name.length - 1);
        this.userInput[0].setText(this.name);
        this.cursor.setX(
          this.dimensions.center.x - 200 + this.userInput[0].width + 5
        );
      } else if (event.key === "Enter") {
        this.onSave();
      }
    });
  }

  toggleCursor() {
    let alpha = this.cursor.alpha ? 0 : 1;
    this.cursor.setAlpha(alpha);

    this.timer = setTimeout(this.toggleCursor.bind(this), 500);
  }

  onSave() {
    this.highScores.push({ score: this.score, name: this.name });
    this.highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem(
      "highscores",
      JSON.stringify(this.highScores.slice(0, 5))
    );
    this.scene.start(highscores);
  }
}
