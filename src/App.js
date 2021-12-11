import React, { useState } from "react";

import Axios from "axios";
import env from "react-dotenv";

import { FaWind } from "react-icons/fa";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";

import WeatherInfo from "./components/WeatherInfo";

const WeatherIcons = {
  "01d": "../Assets/icons/sunny.svg",
  "01n": "../Assets/icons/night.svg",
  "02d": "../Assets/icons/day.svg",
  "02n": "../Assets/icons/cloudy-night.svg",
  "03d": "../Assets/icons/cloudy.svg",
  "03n": "../Assets/icons/cloudy.svg",
  "04d": "../Assets/icons/perfect-day.svg",
  "04n": "../Assets/icons/cloudy-night.svg",
  "09d": "../Assets/icons/rain.svg",
  "09n": "../Assets/icons/rain-night.svg",
  "10d": "../Assets/icons/rain.svg",
  "10n": "../Assets/icons/rain-night.svg",
  "11d": "../Assets/icons/storm.svg",
  "11n": "../Assets/icons/storm.svg",
};

function App() {
  const [flipped, setFlipped] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState();

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const res = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${env.API_KEY}`
    ).catch(console.clear);

    if (res) {
      setData(res.data);
      setFlipped((prev) => !prev);
    }
  };

  const backHandler = () => {
    setFlipped((prev) => !prev);
    setInput("");
    setData();
  };

  const convertTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()}:${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };

  return (
    <div className="weather-info">
      <h1 className="title">Weather Info</h1>
      <div className={`wrapper ${flipped ? "flipped" : ""}`}>
        {!flipped ? (
          <div className="front">
            <form>
              <input
                className="search-bar"
                type="text"
                placeholder="Enter a city name"
                value={input}
                onChange={inputChangeHandler}
              />
              <button className="search-btn" onClick={searchHandler}>
                Search
              </button>
            </form>
            <img src={WeatherIcons["04d"]} alt="home-img" />
          </div>
        ) : (
          <div className="back">
            <h2 className="location">
              {data.name} - {data.sys.country}
            </h2>
            <div className="main-container">
              <div className="main-container__infos">
                <h3 className="temp">{`${Math.floor(
                  data.main.temp - 273
                )}°C`}</h3>
                <p className="description">{data.weather[0].description}</p>
              </div>
              <img
                src={WeatherIcons[data.weather[0].icon]}
                alt="weather-img"
              ></img>
            </div>
            <div className="container">
              <h2 className="more-info">More info</h2>
              <div className="container__infos">
                <WeatherInfo
                  icon={<FiSunrise className="icon" />}
                  name="sunrise"
                  value={convertTime(data.sys.sunrise)}
                />
                <WeatherInfo
                  icon={<FiSunset className="icon" />}
                  name="sunset"
                  value={convertTime(data.sys.sunset)}
                />
                <WeatherInfo
                  icon={<WiHumidity className="icon" />}
                  name="humidity"
                  value={data.main.humidity}
                />
                <WeatherInfo
                  icon={<FaWind className="icon" />}
                  name="wind"
                  value={data.wind.speed}
                />
              </div>
            </div>
            <button className="back-btn" onClick={backHandler}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
