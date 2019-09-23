import { Scene } from "phaser";
import { getCoordinates } from "../../utils/coordinates";
import { addMenuItem, FONT } from "../../utils/text";
import { hud, play } from "../keys";

const MENU_ITEMS = [
  { text: "NEW GAME", scenes: [hud, play] },
  { text: "INSTRUCTIONS", scenes: [] }
];
const BASE_OFFSET = -((MENU_ITEMS.length * (FONT.size + 10)) / 2);

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
      this.cursors.space.on("down", this.onSelect.bind(this));
    }

    this.menuItems = MENU_ITEMS.map(({ text }, index) => {
      return addMenuItem(
        this,
        this.dimensions.center.x,
        this.dimensions.center.y + BASE_OFFSET + index * (FONT.size + 10),
        text
      );
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
  onSelect() {
    MENU_ITEMS[this.selectedItem].scenes.forEach(scene => {
      this.scene.start(scene);
    });
  }
}
