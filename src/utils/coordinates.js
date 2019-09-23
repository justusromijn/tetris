import { grid } from "./grid";

let x, y;
export function createCoordinates(width, height) {
  console.log("coordinates created");
  x = width / 2;
  y = height / 2;
}

export function getCoordinates() {
  if (!x || !y) {
    throw "Coordinates not created yet";
  }
  return {
    center: {
      x,
      y
    },
    left: x - (grid.width / 2) * grid.tile + grid.tile / 2,
    right: x + (grid.width / 2) * grid.tile + grid.tile / 2,
    bottom: y + (grid.height / 2) * grid.tile + grid.tile / 2,
    top: y - (grid.height / 2) * grid.tile + grid.tile / 2
  };
}
