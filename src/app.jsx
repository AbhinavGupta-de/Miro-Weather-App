import * as React from "react";
import { createRoot } from "react-dom/client";
import { useFormik } from "formik";

import "../src/assets/style.css";
import { capitalize, createWeatherCard } from "./WeatherCard";

const ShowOptionRadio = ({ formik, option }) => (
  <>
    <h3>{`Show ${capitalize(option)}: `}</h3>
    <label>
      <input
        type="radio"
        name={`isShow${option}`}
        value="true"
        checked={formik.values[`isShow${option}`] === true}
        onChange={() => {formik.setFieldValue(`isShow${option}`, true); console.log(`isShow${option}`, formik.values[`isShow${option}`])}}
      />
      Yes
    </label>

    <label>
      <input
        type="radio"
        name={`isShow${option}`}
        value="false"
        checked={formik.values[`isShow${option}`] === false}
        onChange={() => {formik.setFieldValue(`isShow${option}`, false); console.log(`isShow${option}`, formik.values[`isShow${option}`])}}
      />
      No
    </label>
  </>
);

const App = () => {
  const API_KEY = "4cb62d80a5308c706b69cc3ce31ee124";

  const formik = useFormik({
    initialValues: {
      city: "Helsinki",
      isCelsius: true,
      isShowCity: true,
      isShowIcon: true,
      isShowDegree: true,
      isShowHumidity: true,
      isShowWind: true,
      isShowDay: true,
      isShowStatus: true,
    },
    onSubmit: async (values) => {
      const trimedcity = values.city.trim();
      const city = trimedcity.replace(/ /g, '+');

      if (!city) {
        console.log("Please enter a city name.");
        return;
      }

      try {
        const weatherData = await fetchWeather(city);
        console.log("weather", weatherData);
        await createWeatherCard(
          weatherData,
          city,
          values.isShowCity,
          values.isShowIcon,
          values.isShowDegree,
          values.isShowHumidity,
          values.isShowWind,
          values.isShowDay,
          values.isShowStatus
        );
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

        <h2>Addtional Options:</h2>
        <h3>Degree Unit: </h3>
        <label>
          <input
            type="radio"
            name="isCelsius"
            value="true"
            checked={formik.values.isCelsius === true}
            onChange={() => {formik.setFieldValue('isCelsius', true); console.log('isCelsius', formik.values.isCelsius)}}
          />
          Celsius
        </label>

        <label>
          <input
            type="radio"
            name="isCelsius"
            value="false"
            checked={formik.values.isCelsius === false}
            onChange={() => {formik.setFieldValue('isCelsius', false); console.log('isCelsius', formik.values.isCelsius)}}
          />
          Fahrenheit
        </label>

        <ShowOptionRadio formik={formik} option="Degree" />
        <ShowOptionRadio formik={formik} option="City" />
        <ShowOptionRadio formik={formik} option="Humidity" />
        <ShowOptionRadio formik={formik} option="Wind" />
        <ShowOptionRadio formik={formik} option="Day" />
        <ShowOptionRadio formik={formik} option="Status" />

      </form>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
