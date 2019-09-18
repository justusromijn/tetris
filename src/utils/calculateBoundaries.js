export function calculateBoundaries(sys, { width, height, tile }) {
  const boundaries = {
    center: {
      x: sys.canvas.width / 2,
      y: sys.canvas.height / 2
    }
  };
  boundaries.left = boundaries.center.x - (width / 2) * tile + tile / 2;
  boundaries.right = boundaries.center.x + (width / 2) * tile + tile / 2;
  boundaries.bottom = boundaries.center.y + (height / 2) * tile + tile / 2;
  boundaries.top = boundaries.center.y - (height / 2) * tile + tile / 2;

  return boundaries;
}
