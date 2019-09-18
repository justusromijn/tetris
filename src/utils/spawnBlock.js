import { blocks } from "../blocks";
import { randomRotate } from "./matrixRotate";
import { randomFromArray } from "./randomFromArray";

export function spawnBlock() {
  let cursor = {
    x: 3,
    y: 0,
    ...randomFromArray(blocks)
  };
  cursor.shape = randomRotate(cursor.shape);
  return cursor;
}
