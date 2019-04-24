import { Scene } from 'phaser';
import { createStore } from 'redux';
import { install } from 'redux-loop';

import { tetris } from './tetris.js';
import { getDimensions } from '../../utils';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const TILE_SIZE = 32;

export class PlayScene extends Scene {
  constructor(config) {
    super(config);
    this.store = null;
    this.dimensions = null;
    this.sprites = null;
    this.ticker = null;
    this.cursors = null;
    this.keytrackers = {
      left: null,
      right: null,
      down: null,
      up: null
    };
  }

  create() {
    // redux store
    this.store = createStore(tetris, install());
    this.store
      .subscribe(() => {
        this.render(this.store.getState());
      })
      .bind(this);

    // input event binding
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.left.on('down', this.onLeft.bind(this));
    this.cursors.left.on('up', this.onLeftUp.bind(this));
    this.cursors.right.on('down', this.onRight.bind(this));
    this.cursors.right.on('up', this.onRightUp.bind(this));
    this.cursors.up.on('down', this.onUp.bind(this));
    this.cursors.up.on('up', this.onUpUp.bind(this));
    this.cursors.down.on('down', this.onDown.bind(this));
    this.cursors.down.on('up', this.onDownUp.bind(this));
    this.cursors.space.on('down', this.onFall.bind(this));

    // get real screen coordinates
    this.dimensions = getDimensions(this.sys, {
      width: GRID_WIDTH,
      height: GRID_HEIGHT,
      tile: TILE_SIZE
    });

    // add visual background
    this.add.sprite(
      this.dimensions.center.x,
      this.dimensions.center.y,
      'assets',
      'tetris-border.png'
    );

    // add sprite for each tile
    this.sprites = Array.from({ length: GRID_HEIGHT }, (_, ri) =>
      Array.from({ length: GRID_WIDTH }, (_, ci) => {
        let sprite = this.add.sprite(
          this.dimensions.left + ci * TILE_SIZE,
          this.dimensions.top + ri * TILE_SIZE,
          'assets',
          `block-red.png`
        );
        sprite.visible = false;
        return sprite;
      })
    );

    // start game and ticker
    this.store.dispatch({ type: 'START' });
    this.ticker = setTimeout(
      this.onTick.bind(this),
      this.store.getState().speed
    );
  }

  render(state) {
    state.grid.forEach((row, rowIx) => {
      row.forEach((cell, cellIx) => {
        if (cell.fill) {
          this.sprites[rowIx][cellIx].visible = true;
          this.sprites[rowIx][cellIx].setTexture(
            'assets',
            `block-${cell.fill}.png`
          );
        } else {
          this.sprites[rowIx][cellIx].visible = false;
        }
      });
    });
    if (state.cursor.shape) {
      state.cursor.shape.forEach((row, rowIx) => {
        row.forEach((cell, cellIx) => {
          let x = state.cursor.x + cellIx,
            y = state.cursor.y + rowIx;

          if (cell) {
            this.sprites[y][x].visible = true;
            this.sprites[y][x].setTexture(
              'assets',
              `block-${state.cursor.fill}.png`
            );
          }
        });
      });
    }
  }

  onTick() {
    this.ticker = setTimeout(
      this.onTick.bind(this),
      this.store.getState().speed
    );
    this.store.dispatch({ type: 'DROP' });
  }

  onKey(key) {
    this.store.dispatch({ type: INPUT_ACTIONS[key] });
  }

  onLeft() {
    this.store.dispatch({ type: 'MOVE_LEFT' });
    this.keytrackers.left = setTimeout(this.onLeft.bind(this), 100);
  }
  onLeftUp() {
    clearTimeout(this.keytrackers.left);
  }

  onRight() {
    this.store.dispatch({ type: 'MOVE_RIGHT' });
    this.keytrackers.right = setTimeout(this.onRight.bind(this), 100);
  }

  onRightUp() {
    clearTimeout(this.keytrackers.right);
  }

  onUp() {
    this.store.dispatch({ type: 'ROTATE_RIGHT' });
    this.keytrackers.up = setTimeout(this.onUp.bind(this), 100);
  }
  onUpUp() {
    clearTimeout(this.keytrackers.up);
  }
  onDown() {
    this.store.dispatch({ type: 'DROP' });
    this.keytrackers.down = setTimeout(this.onDown.bind(this), 100);
  }
  onDownUp() {
    clearTimeout(this.keytrackers.down);
  }

  onFall() {
    clearTimeout(this.ticker);
    this.store.dispatch({ type: 'FALL' });
    this.ticker = setTimeout(
      this.onTick.bind(this),
      this.store.getState().speed
    );
  }
}
