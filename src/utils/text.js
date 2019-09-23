export const FONT = {
  size: 30
};

const fontStyle = {
  fontFamily: '"Tahoma", sans-serif',
  fontSize: FONT.size + "px"
};

export const addMenuItem = (scene, x, y, text) => {
  let item = scene.add.text(x, y, text, fontStyle);

  item.setOrigin(0.5, 0.5);
  item.setColor("#ffffff");
  return item;
};

export const addHudItem = (scene, x, y, text) => {
  let item = scene.add.text(x, y, text, fontStyle);
  item.setOrigin(1, 0);
  item.setColor("#ffffff");
  return item;
};
