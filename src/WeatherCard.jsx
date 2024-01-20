const card = await miro.board.createShape({
  content: "This is a very yellow star shape.",
  shape: "star",
  style: {
    fillColor: "#FEFF45",
  },
  x: 0,
  y: 0,
  width: 280,
  height: 280,
});

export const createWeatherCard = async (weatherData) => {
  await card.sync();
  await miro.board.viewport.zoomTo(card);
};
