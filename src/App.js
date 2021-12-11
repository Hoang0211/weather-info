import React, { useState } from "react";

import env from "react-dotenv";

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

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
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
              <button>Search</button>
            </form>
            <img src={WeatherIcons["04d"]} alt="home-img" />
          </div>
        ) : (
          <div className="back"></div>
        )}
      </div>
    </div>
  );
}

export default App;
