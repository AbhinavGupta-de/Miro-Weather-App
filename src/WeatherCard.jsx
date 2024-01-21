const card = async () =>
  await miro.board.createShape({
    shape: "round_rectangle",
    style: {
      fillColor: "#FFFFFF",
    },
    x: 0,
    y: 0,
    width: 280,
    height: 280,
  });

const cityText = async (text) => {
  await miro.board.createText({
    content: `City: ${text}`,
    style: {
      color: "#1a1a1a", // Default value: '#1a1a1a' (black)
      fillColor: "transparent", // Default value: transparent (no fill)
      fillOpacity: 1, // Default value: 1 (solid color)
      fontFamily: "arial", // Default font type for the text
      fontSize: 14, // Default font size for the text
      textAlign: "left", // Default horizontal alignment for the text
    },
    x: 0, // Default value: horizontal center of the board
    y: 0, // Default value: vertical center of the board
    width: 300,
    rotation: 0.0,
  });
};

const todayText = async (text) => {
  await miro.board.createText({
    content: `${text}`,
    style: {
      color: "#1a1a1a", // Default value: '#1a1a1a' (black)
      fillColor: "transparent", // Default value: transparent (no fill)
      fillOpacity: 1, // Default value: 1 (solid color)
      fontFamily: "arial", // Default font type for the text
      fontSize: 14, // Default font size for the text
      textAlign: "left", // Default horizontal alignment for the text
    },
    x: 0, // Default value: horizontal center of the board
    y: 0, // Default value: vertical center of the board
    width: 300,
    rotation: 0.0,
  });
};

const degreeText = async (text, isCelsius) => {
  await miro.board.createText({
    content: `${text}°${isCelsius ? "C" : "F"}`,
    style: {
      color: "#1a1a1a", // Default value: '#1a1a1a' (black)
      fillColor: "transparent", // Default value: transparent (no fill)
      fillOpacity: 1, // Default value: 1 (solid color)
      fontFamily: "arial", // Default font type for the text
      fontSize: 14, // Default font size for the text
      textAlign: "left", // Default horizontal alignment for the text
    },
    x: 0, // Default value: horizontal center of the board
    y: 0, // Default value: vertical center of the board
    width: 300,
    rotation: 0.0,
  });
};

const statusText = async (text) => {
  await miro.board.createText({
    content: `${text}`,
    style: {
      color: "#1a1a1a", // Default value: '#1a1a1a' (black)
      fillColor: "transparent", // Default value: transparent (no fill)
      fillOpacity: 1, // Default value: 1 (solid color)
      fontFamily: "arial", // Default font type for the text
      fontSize: 14, // Default font size for the text
      textAlign: "left", // Default horizontal alignment for the text
    },
    x: 0, // Default value: horizontal center of the board
    y: 0, // Default value: vertical center of the board
    width: 300,
    rotation: 0.0,
  });
};

const items = [card, cityText];
const group = await miro.board.group({ items });
const frame = await miro.board.createFrame();

export const createWeatherCard = async (weatherData) => {
  await frame.add(group);
  await miro.board.viewport.zoomTo(card);
};
