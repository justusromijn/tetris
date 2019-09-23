export const fonts = {
  title: 50,
  heading: 30,
  text: 20
};

export const FONT = {
  size: 30
};

function getFontStyle(size) {
  return {
    fontFamily: '"FORCED SQUARE", sans-serif',
    fontSize: size + "px"
  };
}

const regular = {
  fontFamily: '""'
};

export const addMenuItem = (scene, x, y, text) => {
  let item = scene.add.text(x, y, text, getFontStyle(fonts.heading));

  item.setOrigin(0.5, 0.5);
  item.setColor("#f9f9f9");
  return item;
};

export const addHudItem = (scene, x, y, text) => {
  let item = scene.add.text(x, y, text, getFontStyle(fonts.heading));
  item.setOrigin(1, 0);
  item.setColor("#f9f9f9");
  return item;
};

export const addMultilineText = (scene, x, y, textArr) => {
  let returnArr = [];
  textArr.reduce((acc, { text, type }) => {
    let line = scene.add.text(x, y + acc, text, getFontStyle(fonts[type]));

    line.setWordWrapWidth(400, true);
    returnArr.push(line);
    return acc + line.height + 20;
  }, 0);
  return returnArr;
};
