export function hasCollision(grid, cursor, shape, deltaX, deltaY) {
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
