import { dateForToday, dayOfWeek } from "./CurrentDay";

// Delete this after everything is working
import { weatherData } from "./ApiResultExample";

const locationProperties = (x, y, width) => {
  return {
    x: x,
    y: y,
    width: width,
    rotation: 0.0,
  };
};

const styleProperties = () => {
  return {
    color: "#1a1a1a", // Default value: '#1a1a1a' (black)
    fillColor: "transparent", // Default value: transparent (no fill)
    fillOpacity: 1, // Default value: 1 (solid color)
    fontFamily: "arial", // Default font type for the text
    fontSize: 14, // Default font size for the text
    textAlign: "left", // Default horizontal alignment for the text
  };
};

const shapeProperties = (w, h, x, y) => {
  return {
    shape: "rectangle",
    style: {
      color: "#FDFDFF", // Default text color: '#1a1a1a' (black)
      fillColor: "#FFFFFF", // Default shape fill color: transparent (no fill)
      fillOpacity: 1.0, // Default fill color opacity: no opacity
    },
    x: x, // Default value: center of the board
    y: y, // Default value: center of the board
    width: w, //Should be changed depending on amount of text
    height: h,
  };
};

export function capitalize(str) {
  // Check if the string is not empty
  if (str.length === 0) {
    return str;
  }

  // Capitalize the first letter and concatenate with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const cityTextContent = (text, x, y) => {
  return {
    content: text,
    style: {
      fontSize: 14,
      color: "#1a1a1a",
    },
    x: x,
    y: y,
    width: text.length * 6.75,
  };
};

const logoContent = (text) => {
  return {
    title: "Logo",
    url: `https://openweathermap.org/img/wn/${text}@2x.png`,
    x: 0,
    y: 0,
    width: 200,
    rotation: 0.0,
  };
};

const degreeContent = (text, x, y) => {
  return {
    content: text,
    style: {},
    x: x, // Default value: horizontal center of the board
    y: y, // Default value: vertical center of the board
    width: text.length * 7,
    rotation: 0.0,
  };
};

const statusContent = (text, x, y) => {
  return {
    content: capitalize(text),
    style: {
      ...styleProperties(),
    },
    ...locationProperties(x, y, text.length*6.75),
  };
};

const humidityContent = (text, x, y) => {
  return {
    content: `Humidity: ${text}%`,
    style: {
      ...styleProperties(),
    },
    ...locationProperties(x, y, text.length*6.75),
  };
};

const windContent = (text, x, y) => {
  return {
    content: text,
    style: {
      ...styleProperties(),
    },
    ...locationProperties(x, y, text.length*6.75),
  };
};

export const createWeatherCard = async (
  weatherData,
  city,
  isCelsius,
  isShowCity,
  isShowIcon,
  isShowDegree,
  isShowHumidity,
  isShowWind,
  isShowDay,
  isShowStatus
) => {
  console.log("data", weatherData, dateForToday, dayOfWeek);

  let items = [];

  const booleanToggles = [
    isShowCity,
    isShowIcon,
    isShowDegree,
    isShowHumidity,
    isShowWind,
    isShowDay,
    isShowStatus,
  ];
  // trueCount will show how many lines you need to makes, scale the height with this
  const trueCount = booleanToggles.filter((v) => v).length;

  if (!weatherData || !city) return;
  else {
    // Additional features
    let cityString = "";
    const degreeString = `${isCelsius ? Math.floor(weatherData.main.temp - 273.15) + '°C' : Math.floor((weatherData.main.temp - 273.15)*9/5 + 32) + '°F'}`
    let lineCount = 1;
    const afterAsync = () => {
      lineCount++;
      console.log(degreeString, -degreeString*3.25 + 5, -h / 2 + 20 * lineCount );
    }

    const calcH = (lineCount) => -h/2 + 20*lineCount;

    if (isShowCity) cityString += "City: " + weatherData.name + ". ";
    if (isShowDay) cityString += capitalize(dayOfWeek) + ", " + dateForToday;

    const w = cityString.length*7+15;
    const h = 200;
    const longestWidth = cityString.length*6.75;

    // Create border box covering Weather Report
    const shape = await miro.board.createShape(shapeProperties(w, h, 0, 0));
    items.push(shape);

    if (cityString) {
      const cityText = await miro.board.createText(
        cityTextContent(cityString, 0, calcH(lineCount))
      ).then(afterAsync)
      items.push(cityText);
    }

    if (isShowDegree) {
      const degreeText = await miro.board.createText(
        degreeContent(degreeString, 0, calcH(lineCount))
      ).then(afterAsync);
      items.push(degreeText);
    }

    if (isShowStatus) {
      const statusText = await miro.board.createText(
        statusContent(weatherData.weather[0].description, 0, calcH(lineCount))
      ).then(afterAsync);
      items.push(statusText);
    }

    if (isShowWind) {
      const windText = await miro.board.createText(
        windContent(`Wind: ${weatherData.wind.speed}m/s`, 0, calcH(lineCount))
      );
      items.push(windText);
    }
    if (isShowHumidity) {
      const humidityText = await miro.board.createText(
        humidityContent(weatherData.main.humidity, 0, calcH(lineCount))
      );
      items.push(humidityText);
    }

    if (isShowIcon) {
      const logo = await miro.board.createImage(
        logoContent(weatherData.weather[0].icon)
      );
      items.push(logo);
    }

    // Grouping them into one
    const group = await miro.board.group({ items });
    const frame = await miro.board.createFrame();

    await frame.add(group);
    await miro.board.viewport.zoomTo(frame);
  }
};
