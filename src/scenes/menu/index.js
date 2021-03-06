import { Scene } from "phaser";
import { getCoordinates } from "../../utils/coordinates";
import { addText } from "../../utils/text";
import { highscores, hud, instructions, play } from "../keys";

const MENU_ITEMS = [
  { text: "NEW GAME", style: "heading", scenes: [hud, play] },
  { text: "HIGHSCORES", style: "heading", scenes: [highscores] },
  { text: "INSTRUCTIONS", style: "heading", scenes: [instructions] }
];

export class MenuScene extends Scene {
  constructor(config) {
    super(config);
    this.selectedItem = 0;
    this.menuItems = [];
    this.dimensions = getCoordinates();
  }

  create() {
    if (!this.cursors) {
      this.enter = this.input.keyboard.addKey("ENTER");
      this.enter.on("down", this.onSelect.bind(this));
      this.cursors = this.input.keyboard.createCursorKeys();
      this.cursors.up.on("down", this.onUp.bind(this));
      this.cursors.down.on("down", this.onDown.bind(this));
    }

    this.menuHeader = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y - 300,
      [{ text: "TETRIS", style: "title" }]
    );
    this.menuItems = addText(
      this,
      this.dimensions.center.x - 200,
      this.dimensions.center.y - 200,
      MENU_ITEMS
    );
    this.highlightSelection();
  }

  update() {}

  onUp() {
    this.selectedItem =
      this.selectedItem === 0 ? MENU_ITEMS.length - 1 : this.selectedItem - 1;
    this.highlightSelection();
  }
  onDown() {
    this.selectedItem =
      this.selectedItem === MENU_ITEMS.length - 1 ? 0 : this.selectedItem + 1;
    this.highlightSelection();
  }
  onSelect() {
    MENU_ITEMS[this.selectedItem].scenes.forEach(scene => {
      this.scene.start(scene);
    });
  }
  highlightSelection() {
    this.menuItems.forEach((item, index) => {
      let color = index === this.selectedItem ? "#f9f9f9" : "#909090";
      item.setColor(color);
    });
  }
}
