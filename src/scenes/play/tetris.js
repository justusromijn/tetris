import { loop, Cmd } from 'redux-loop';
import { rotateClockwise } from '../../matrix';
import { spawn, willCollide } from '../../utils';

const generateRow = () => Array.from({ length: 10 }, () => ({ fill: null }));

const initState = {
  grid: Array.from({ length: 20 }, () => generateRow()),
  cursor: { x: null, y: null, shape: null, fill: null },
  speed: 2000,
  score: 0
};

export const tetris = (_state = initState, action) => {
  let state = JSON.parse(JSON.stringify(_state));
  switch (action.type) {
    case 'START':
      return loop(state, Cmd.action({ type: 'SPAWN' }));

    case 'SPAWN':
      state.cursor = spawn();
      if (willCollide(state.grid, state.cursor, state.cursor.shape, 0, 0)) {
        state.gameOver = true;
      }
      return state;

    case 'MOVE_LEFT':
      if (!willCollide(state.grid, state.cursor, state.cursor.shape, -1, 0)) {
        state.cursor.x--;
      }
      return state;

    case 'MOVE_RIGHT':
      if (!willCollide(state.grid, state.cursor, state.cursor.shape, 1, 0)) {
        state.cursor.x++;
      }
      return state;

    case 'ROTATE_LEFT':
      return state;

    case 'ROTATE_RIGHT':
      let newShape = rotateClockwise(state.cursor.shape);
      if (!willCollide(state.grid, state.cursor, newShape, 0, 0)) {
        state.cursor.shape = newShape;
      }
      return state;

    case 'DROP':
      if (!willCollide(state.grid, state.cursor, state.cursor.shape, 0, 1)) {
        state.cursor.y++;
        return state;
      }
      return loop(state, Cmd.action({ type: 'LOCK' }));

    case 'FALL':
      while (!willCollide(state.grid, state.cursor, state.cursor.shape, 0, 1)) {
        state.cursor.y++;
      }
      return loop(state, Cmd.action({ type: 'LOCK' }));

    case 'LOCK':
      state.cursor.shape.forEach((row, rowIx) => {
        row.forEach((cell, cellIx) => {
          if (cell) {
            state.grid[state.cursor.y + rowIx][state.cursor.x + cellIx].fill =
              state.cursor.fill;
          }
        });
      });
      return loop(state, Cmd.action({ type: 'RESOLVE' }));

    case 'RESOLVE':
      // detect full lines and resolve them, adding points... THEN SPAWN NEW BLOCK
      state.grid.forEach((row, rowIx) => {
        if (row.every((cell) => cell.fill)) {
          state.grid.splice(rowIx, 1);
          state.grid.unshift(generateRow());
        }
      });
      return loop(state, Cmd.action({ type: 'SPAWN' }));
    case 'LEVEL_UP':
      return state;

    default:
      return state;
  }
};
