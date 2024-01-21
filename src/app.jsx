import * as React from "react";
import { createRoot } from "react-dom/client";
import { useFormik } from "formik";

import "../src/assets/style.css";
import { createWeatherCard } from "./WeatherCard";

const App = () => {
  const API_KEY = "4cb62d80a5308c706b69cc3ce31ee124";
  const [city, setCity] = React.useState("");

  const [weather, setWeather] = React.useState({});

  const formik = useFormik({
    initialValues: {
      city: "Helsinki",
    },
    onSubmit: async (values) => {
      const city = values.city.trim();
      if (!city) {
        console.log("Please enter a city name.");
        return;
      }

      try {
        const weatherData = await fetchWeather(city);
        console.log("weather", weatherData);
        await createWeatherCard(weatherData);
      } catch (e) {
        console.error(e);
      }
    },
  });

  // make the weather report card
  const handleChange = () => {};

  async function fetchWeather(city) {
    console.log("city", city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` +
        API_KEY
    );
    const weather = await response.json();
    return weather;
  }

  async function addShape() {
    try {
      await createWeatherCard("random");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <h1>Welcome to the Weather App</h1>
      </div>

      <form className="cs1 ce12" onSubmit={formik.handleSubmit}>
        <h2>Enter your city name</h2>

        <input
          id="city"
          type="text"
          placeholder="Enter your city names"
          name="city"
          onChange={formik.handleChange}
          value={formik.values.city}
        />

        <button type="submit">Submit</button>
      </form>

      <button onClick={() => addShape()}>Press to create item</button>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
