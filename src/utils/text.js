export const fonts = {
  title: {
    size: 50,
    margin: 30,
    origin: 0.5
  },
  heading: {
    size: 30,
    margin: 20,
    origin: 0.5
  },
  label: {
    size: 30,
    margin: 20,
    origin: 0
  },
  value: {
    size: 30,
    margin: 20,
    origin: 1
  },
  text: {
    size: 20,
    margin: 10,
    origin: 0
  },
  none: {
    margin: 0,
    size: 0,
    origin: 0
  }
};

function getFont(size) {
  return {
    fontFamily: '"FORCED SQUARE", sans-serif',
    fontSize: size + "px"
  };
}

export const addText = (scene, x, y, textArr, wrap = 400) => {
  let returnArr = [];

  textArr.reduce(
    (acc, { text, style = "text", color = "#f9f9f9" }) => {
      let newY = acc.y + Math.max(fonts[acc.style].margin, fonts[style].margin);
      let item = scene.add.text(x, newY, text, getFont(fonts[style].size));
      item.setColor(color);
      item.setLineSpacing(fonts[style].size / 2);

      item.setOrigin(fonts[style].origin, 0);
      fonts[style].origin === 0.5 && item.setX(x + wrap / 2);
      item.setWordWrapWidth(wrap, true);

      returnArr.push(item);

      return { style, y: newY + item.height };
    },
    { style: "none", y }
  );
  return returnArr;
};

export const addHudItem = (scene, x, y, text) => {
  let item = scene.add.text(x, y, text, getFont(fonts.heading.size));
  item.setOrigin(1, 0);
  item.setColor("#f9f9f9");
  return item;
};
