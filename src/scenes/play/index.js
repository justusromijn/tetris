import { Scene } from "phaser";
import { createStore } from "redux";
import { install } from "redux-loop";
import { getCoordinates } from "../../utils/coordinates";
import { grid } from "../../utils/grid";
import { game_over, hud } from "../keys";
import { tetris } from "./tetris.js";

export class PlayScene extends Scene {
  constructor(config) {
    console.log("constructor");
    super(config);
    this.dimensions = getCoordinates();
    this.store = null;
    this.sprites = null;
    this.ticker = null;
    this.cursors = null;
  }

  create() {
    // redux store
    this.grid = grid;
    this.store = createStore(tetris, install());
    this.unsubscribeStore = this.store
      .subscribe(() => {
        this.render(this.store.getState());
      })
      .bind(this);

    // input event binding
    if (!this.cursors) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.cursors.left.on("down", this.onLeft.bind(this));
      this.cursors.right.on("down", this.onRight.bind(this));
      this.cursors.up.on("down", this.onUp.bind(this));
      this.cursors.down.on("down", this.onDown.bind(this));
      this.cursors.space.on("down", this.onFall.bind(this));
    }
    // add visual background
    this.add.sprite(
      this.dimensions.center.x,
      this.dimensions.center.y,
      "assets",
      "tetris-border.png"
    );

    // add sprite for each tile
    this.sprites = Array.from({ length: grid.height }, (_, ri) =>
      Array.from({ length: grid.width }, (_, ci) => {
        let sprite = this.add.sprite(
          this.dimensions.left + ci * grid.tile,
          this.dimensions.top + ri * grid.tile,
          "assets",
          `block-red.png`
        );
        sprite.visible = false;
        return sprite;
      })
    );

    // start game and ticker
    this.store.dispatch({ type: "START" });
    this.ticker = setTimeout(
      this.onTick.bind(this),
      this.store.getState().speed
    );
  }

  render(state) {
    this.events.emit("change", state);

    // GAME OVER
    if (state.gameOver) {
      this.cursors.left.off("down", this.onLeft);
      this.cursors.right.off("down", this.onRight);
      this.cursors.up.off("down", this.onUp);
      this.cursors.down.off("down", this.onDown);
      this.cursors.space.off("down", this.onFall);

      clearTimeout(this.ticker);
      this.unsubscribeStore();
      this.scene.stop(hud);
      this.scene.start(game_over, { score: state.score });
      return;
    }

    // DROPPED BLOCKS
    state.grid.forEach((row, rowIx) => {
      row.forEach((cell, cellIx) => {
        if (cell.fill) {
          this.sprites[rowIx][cellIx].visible = true;
          this.sprites[rowIx][cellIx].setTexture(
            "assets",
            `block-${cell.fill}.png`
          );
        } else {
          this.sprites[rowIx][cellIx].visible = false;
        }
      });
    });

    // CURRENT BLOCK
    if (state.cursor.shape) {
      state.cursor.shape.forEach((row, rowIx) => {
        row.forEach((cell, cellIx) => {
          let x = state.cursor.x + cellIx,
            y = state.cursor.y + rowIx;

          if (cell) {
            this.sprites[y][x].visible = true;
            this.sprites[y][x].setTexture(
              "assets",
              `block-${state.cursor.fill}.png`
            );
          }
        });
      });
    }
  }
  update() {}

  onTick() {
    if (this.store.getState().gameOver) {
      return;
    }

    this.ticker = setTimeout(
      this.onTick.bind(this),
      this.store.getState().speed
    );
    this.store.dispatch({ type: "DROP" });
  }

  onLeft() {
    this.store.dispatch({ type: "MOVE_LEFT" });
  }

  onRight() {
    this.store.dispatch({ type: "MOVE_RIGHT" });
  }

  onUp() {
    this.store.dispatch({ type: "ROTATE_RIGHT" });
  }

  onDown() {
    this.store.dispatch({ type: "DROP" });
  }

  onFall() {
    clearTimeout(this.ticker);
    this.store.dispatch({ type: "FALL" });
    this.ticker = setTimeout(
      this.onTick.bind(this),
      this.store.getState().speed
    );
  }
}
