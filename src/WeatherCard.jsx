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

const shapeProperties = () => {
  return {
    color: '#FDFDFF', // Default text color: '#1a1a1a' (black)
    fillColor: '#FFFFFF', // Default shape fill color: transparent (no fill)
    fillOpacity: 0.0, // Default fill color opacity: no opacity
  }
}

export function capitalize(str) {
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
    width: 300,
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

const degreeContent = (text, isCelsius) => {
  let degree = text;
  let unit;

  if (isCelsius) unit = "°C";
  else {
    degree = (9 / 5) * degree + 32;
    unit = "°F";
  }

  return {
    content: `${text}${unit}`,
    style: {},
    x: 0, // Default value: horizontal center of the board
    y: 0, // Default value: vertical center of the board
    width: 300,
    rotation: 0.0,
  };
};

const statusContent = (text) => {
  return {
    content: capitalize(text),
    style: {
      ...styleProperties(),
    },
    ...locationProperties(0, 0, 300),
  };
};

const humidityContent = (text) => {
  return {
    content: `Humidity: ${text}%`,
    style: {
      ...styleProperties(),
    },
    ...locationProperties(0, 0, 300),
  };
};

const windContent = (text) => {
  return {
    content: `Wind: ${text}m/s`,
    style: {
      ...styleProperties(),
    },
    ...locationProperties(0, 0, 300),
  };
};

const todayContent = (text) => {
  return {
    content: capitalize(text),
    style: {
      ...styleProperties(),
    },
    ...locationProperties(0, 0, 300),
  };
};

const dateContent = (text) => {
  return {
    content: capitalize(text),
    style: {
      ...styleProperties(),
    },
    ...locationProperties(0, 0, 300),
  };
};

export const createWeatherCard = async (
  weatherData,
  city,
  isShowCity,
  isShowIcon,
  isShowDegree,
  isShowHumidity,
  isShowWind,
  isShowDay,
  isShowStatus
) => {
  console.log("data", weatherData);
  console.log(
    "imported",
    weatherData,
    city,
    isShowCity,
    isShowIcon,
    isShowDegree,
    isShowHumidity,
    isShowWind,
    isShowDay,
    isShowStatus
  );

  let items = [];

  if (!weatherData || !city) return;
  else {
    // Create border box covering Weather Report
    const shape = await miro.board.createShape(shapeProperties);
    items.push(shape);

    // Additional features
    if (isShowCity) {
      const cityText = await miro.board.createText(
        cityTextContent(weatherData.name)
      );
      items.push(cityText);
    }

    if (isShowIcon) {
      const logo = await miro.board.createImage(
        logoContent(weatherData.weather[0].icon)
      );
      items.push(logo);
    }
    if (isShowDegree) {
      const degreeText = await miro.board.createText(
        degreeContent(Math.floor(weatherData.main.temp - 273.15), true)
      );
      items.push(degreeText);
    }
    if (isShowStatus) {
      const statusText = await miro.board.createText(
        statusContent(weatherData.weather[0].description)
      );
      items.push(statusText);
    }
    if (isShowWind) {
      const windText = await miro.board.createText(
        windContent(weatherData.wind.speed)
      );
      items.push(windText);
    }
    if (isShowHumidity) {
      const humidityText = await miro.board.createText(
        humidityContent(weatherData.main.humidity)
      );
      items.push(humidityText);
    }
    if (isShowDay) {
      console.log(dateForToday, dayOfWeek);
      const todayText = await miro.board.createText(todayContent(dayOfWeek));
      const dateText = await miro.board.createText(dateContent(dateForToday));
      items.push(todayText);
      items.push(dateText);
    }

    // Grouping them into one
    const group = await miro.board.group({ items });
    const frame = await miro.board.createFrame();

    await frame.add(group);
    await miro.board.viewport.zoomTo(card);
  }
};
