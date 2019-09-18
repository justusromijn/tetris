import { Cmd, loop } from "redux-loop";
import { hasCollision, rotateClockwise, spawnBlock } from "../../utils/index";

const generateRow = () => Array.from({ length: 10 }, () => ({ fill: null }));
const POINT_MAP = {
  0: 0,
  1: 1,
  2: 3,
  3: 6,
  4: 10
};
const LEVEL_BUMP = 15;

const initState = {
  grid: Array.from({ length: 20 }, () => generateRow()),
  cursor: { x: null, y: null, shape: null, fill: null },
  speed: 2000,
  score: 0,
  levelScore: 0,
  level: 1,
  gameOver: false
};

export const tetris = (_state = initState, action) => {
  let state = JSON.parse(JSON.stringify(_state));
  switch (action.type) {
    case "START":
      return loop(state, Cmd.action({ type: "SPAWN" }));

    case "SPAWN":
      state.cursor = spawnBlock();
      if (hasCollision(state.grid, state.cursor, state.cursor.shape, 0, 0)) {
        state.gameOver = true;
      }
      return state;

    case "MOVE_LEFT":
      if (!hasCollision(state.grid, state.cursor, state.cursor.shape, -1, 0)) {
        state.cursor.x--;
      }
      return state;

    case "MOVE_RIGHT":
      if (!hasCollision(state.grid, state.cursor, state.cursor.shape, 1, 0)) {
        state.cursor.x++;
      }
      return state;

    case "ROTATE_LEFT":
      return state;

    case "ROTATE_RIGHT":
      let newShape = rotateClockwise(state.cursor.shape);
      if (!hasCollision(state.grid, state.cursor, newShape, 0, 0)) {
        state.cursor.shape = newShape;
      }
      return state;

    case "DROP":
      if (!hasCollision(state.grid, state.cursor, state.cursor.shape, 0, 1)) {
        state.cursor.y++;
        return state;
      }
      return loop(state, Cmd.action({ type: "LOCK" }));

    case "FALL":
      while (
        !hasCollision(state.grid, state.cursor, state.cursor.shape, 0, 1)
      ) {
        state.cursor.y++;
      }
      return loop(state, Cmd.action({ type: "LOCK" }));

    case "LOCK":
      state.cursor.shape.forEach((row, rowIx) => {
        row.forEach((cell, cellIx) => {
          if (cell) {
            state.grid[state.cursor.y + rowIx][state.cursor.x + cellIx].fill =
              state.cursor.fill;
          }
        });
      });
      return loop(state, Cmd.action({ type: "RESOLVE" }));

    case "RESOLVE":
      // detect full lines and resolve them, adding points... THEN SPAWN NEW BLOCK
      let resolvedRows = 0;
      state.grid.forEach((row, rowIx) => {
        if (row.every(cell => cell.fill)) {
          resolvedRows++;
          state.grid.splice(rowIx, 1);
          state.grid.unshift(generateRow());
        }
      });
      state.score += POINT_MAP[resolvedRows];
      state.levelScore += POINT_MAP[resolvedRows];
      console.log(state.score);
      console.log(state.levelScore);

      if (state.levelScore >= LEVEL_BUMP) {
        return loop(state, Cmd.action({ type: "LEVEL_UP" }));
      }

      return loop(state, Cmd.action({ type: "SPAWN" }));

    case "LEVEL_UP":
      state.levelScore = 0;
      state.level++;
      state.speed = state.speed * 0.8;
      return loop(state, Cmd.action({ type: "SPAWN" }));

    default:
      return state;
  }
};
