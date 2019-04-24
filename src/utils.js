import {
  rotateClockwise,
  rotateCounterClockwise,
  randomRotate
} from './matrix';
import { blocks } from './blocks';

export function getBounds(sys) {
  const center = { x: sys.canvas.width / 2, y: sys.canvas.height / 2 };

  return {
    left: center.x - 5 * 32 + 16,
    right: center.x + 5 * 32 + 16,
    bottom: center.y + 10 * 32 + 16,
    top: center.y - 10 * 32 + 16
  };
}

export function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function spawn() {
  let cursor = {
    x: 3,
    y: 0,
    ...random(blocks)
  };
  cursor.shape = randomRotate(cursor.shape);
  return cursor;
}

// MAGIC! grid detection for rotation and movement
export function willCollide(grid, cursor, shape, deltaX, deltaY) {
  return shape.some((row, rowIx) => {
    return row.some((cell, cellIx) => {
      return (
        cell &&
        (!grid[rowIx + cursor.y + deltaY] ||
          !grid[rowIx + cursor.y + deltaY][cellIx + cursor.x + deltaX] ||
          grid[rowIx + cursor.y + deltaY][cellIx + cursor.x + deltaX].fill)
      );
    });
  });
}

export const getDimensions = (sys, { width, height, tile }) => {
  const dimensions = {
    center: {
      x: sys.canvas.width / 2,
      y: sys.canvas.height / 2
    }
  };
  dimensions.left = dimensions.center.x - (width / 2) * tile + tile / 2;
  dimensions.right = dimensions.center.x + (width / 2) * tile + tile / 2;
  dimensions.bottom = dimensions.center.y + (height / 2) * tile + tile / 2;
  dimensions.top = dimensions.center.y - (height / 2) * tile + tile / 2;

  return dimensions;
};

export const noop = () => {};
export const clone = (obj) => JSON.parse(JSON.stringify(obj));
