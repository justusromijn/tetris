// Scene for main menu...
import { Scene } from "phaser";

const MENU_ITEMS = [
  { text: "NEW GAME", scene: "Play" },
  { text: "CREDITS" },
  { text: "INSTRUCTIONS" }
];
const FONT_SIZE = 30;
const BASE_OFFSET = -((MENU_ITEMS.length * (FONT_SIZE + 10)) / 2);

export class MenuScene extends Scene {
  constructor(config) {
    super(config);
    this.selectedItem = 0;
    this.menuItems = [];
  }

  create({ dimensions, grid }) {
    this.dimensions = dimensions;
    this.grid = grid;
    if (!this.cursors) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.cursors.up.on("down", this.onUp.bind(this));
      this.cursors.down.on("down", this.onDown.bind(this));
      this.cursors.space.on("down", this.onSpace.bind(this));
    }

    this.menuItems = MENU_ITEMS.map(({ text }, index) => {
      let menuItem = this.add.text(
        dimensions.center.x,
        dimensions.center.y + BASE_OFFSET + index * (FONT_SIZE + 10),
        text,
        {
          fontFamily: '"Tahoma", sans-serif',
          fontSize: FONT_SIZE + "px"
        }
      );
      menuItem.setColor("#505050");
      menuItem.setOrigin(0.5, 0.5);
      return menuItem;
    });
  }

  update() {
    this.menuItems.forEach((item, index) => {
      let color = index === this.selectedItem ? "#909090" : "#505050";
      item.setColor(color);
    });
  }

  onUp() {
    this.selectedItem =
      this.selectedItem === 0 ? MENU_ITEMS.length - 1 : this.selectedItem - 1;
  }
  onDown() {
    this.selectedItem =
      this.selectedItem === MENU_ITEMS.length - 1 ? 0 : this.selectedItem + 1;
  }
  onSpace() {
    this.scene.start(MENU_ITEMS[this.selectedItem].scene, {
      dimensions: this.dimensions,
      grid: this.grid
    });
  }
}
