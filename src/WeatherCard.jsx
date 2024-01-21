import { dayOfWeek } from "./CurrentDay"

// Delete this after everything is working
import { weatherData } from "./ApiResultExample"

const locationProperties = (x, y, width) => {
  return {
    x: x,
    y: y,
    width: width,
    rotation: 0.0,
  }
}

const styleProperties = () => {
  return {
    color: "#1a1a1a", // Default value: '#1a1a1a' (black)
    fillColor: "transparent", // Default value: transparent (no fill)
    fillOpacity: 1, // Default value: 1 (solid color)
    fontFamily: "arial", // Default font type for the text
    fontSize: 14, // Default font size for the text
    textAlign: "left", // Default horizontal alignment for the text
  }
}

function capitalize(str) {
  // Check if the string is not empty
  if (str.length === 0) {
    return str;
  }

  // Capitalize the first letter and concatenate with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const cityTextContent = (text) => {
  return {
    content: `City: ${text}`,
    style: {
      color: "#1a1a1a",
    },
    x: 0,
    y: 0,
    width: 300
  }
}

const logoContent = (text) => {
  return {
    title: 'Logo',
    url: `https://openweathermap.org/img/wn/${text}@2x.png`,
    x: 0,
    y: 0,
    width: 200,
    rotation: 0.0,
  }
}

const degreeContent = (text, isCelsius) => {
  let degree = text;
  let unit;

  if (isCelsius) unit = '°C';
  else {
    degree = (9/5 * degree) + 32;
    unit = '°F';
  };

  return {
    content: `${text}${unit}`,
    style: {

    },
    x: 0, // Default value: horizontal center of the board
    y: 0, // Default value: vertical center of the board
    width: 300,
    rotation: 0.0,
  }
}

const statusContent = (text) => {
  return {
    content: capitalize(text),
    style: {
      ...styleProperties()
    }, ...locationProperties(0, 0, 300)
  }
}

const humidityContent = (text) => {
  return {
    content: `Humidity: ${text}%`,
    style: {
      ...styleProperties()
    }, ...locationProperties(0, 0, 300)
  }
}

const windContent = (text) => {
  return {
    content: `Wind: ${text}m/s`,
    style: {
      ...styleProperties()
    }, ...locationProperties(0, 0, 300)
  }
}

const todayContent = (text) => {
  return {
    content: captialize(text),
    style: {
      ...styleProperties()
    }, ...locationProperties(0, 0, 300)
  }
}

export const createWeatherCard = async (text) => {
  const shape = await miro.board.createShape();
  const cityText = await miro.board.createText(cityTextContent('London'));
  const logo = await miro.board.createImage(logoContent(weatherData.weather.icon));
  const degreeText = await miro.board.createText(degreeContent(Math.floor(weatherData.main.temp - 273.15), true));
  const statusText = await miro.board.createText(statusContent(weatherData.weather.description));
  const windText =  await miro.board.createText(windContent(weatherData.wind.speed));
  const humidityText = await miro.board.createText(humidityContent(weatherData.main.humidity));
  const todayText = await miro.board.createText(todayContent(dayOfWeek));

  const items = [shape, cityText, degreeText, logo, statusText, windText, humidityText];

  const group = await miro.board.group({ items });
  const frame = await miro.board.createFrame();

  await frame.add(group);
  await miro.board.viewport.zoomTo(card);
};
