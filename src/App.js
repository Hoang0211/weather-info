import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { FaWind } from 'react-icons/fa';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { WiHumidity } from 'react-icons/wi';

import sunny from './Assets/icons/sunny.svg';
import night from './Assets/icons/night.svg';
import day from './Assets/icons/day.svg';
import cloudy_night from './Assets/icons/cloudy-night.svg';
import cloudy from './Assets/icons/cloudy.svg';
import perfect_day from './Assets/icons/perfect-day.svg';
import rain from './Assets/icons/rain.svg';
import rain_night from './Assets/icons/rain-night.svg';
import storm from './Assets/icons/storm.svg';
import WeatherInfo from './components/WeatherInfo';

const WeatherIcons = {
  '01d': sunny,
  '01n': night,
  '02d': day,
  '02n': cloudy_night,
  '03d': cloudy,
  '03n': cloudy,
  '04d': perfect_day,
  '04n': cloudy_night,
  '09d': rain,
  '09n': rain_night,
  '10d': rain,
  '10n': rain_night,
  '11d': storm,
  '11n': storm,
};

function App() {
  const [flipped, setFlipped] = useState(false);
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputRef = useRef();
  const backBtnRef = useRef();

  useEffect(() => {
    if (!flipped) {
      inputRef.current.focus();
    } else {
      backBtnRef.current.focus();
    }
  }, [flipped]);

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.data;
      setData(data);
    } catch (err) {
      setError(err);
      console.log(err.message);
    } finally {
      setFlipped((prev) => !prev);
      setLoading(false);
    }
  };

  const backHandler = () => {
    setFlipped((prev) => !prev);
    setInput('');
    setError(null);
    setData(null);
  };

  const convertTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()}:${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };

  return (
    <div className='weather-info'>
      <h1 className='title'>Weather Info</h1>
      <div className={`wrapper ${flipped ? 'wrapper-flipped' : ''}`}>
        {!flipped ? (
          <div className='front'>
            <form className='front__form'>
              <input
                className='form__input'
                type='text'
                placeholder='Enter a city name...'
                value={input}
                onChange={inputChangeHandler}
                ref={inputRef}
              />
              <button
                className='btn form__submit'
                type='submit'
                onClick={searchHandler}
              >
                Search
              </button>
            </form>
            <img
              className='front__img'
              src={WeatherIcons['04d']}
              alt='home-img'
            />
          </div>
        ) : (
          <div className='back'>
            {loading && <p className='back__loading'>Please wait...</p>}
            {error && <p className='back__error'>Nothing found!</p>}
            {!loading && !error && (
              <>
                <h2 className='back__title'>
                  {data.name} - {data.sys.country}
                </h2>
                <div className='back__info back__info-main'>
                  <p className='back__temp'>{`${Math.floor(
                    data.main.temp - 273
                  )}°C`}</p>
                  <img
                    className='back__img'
                    src={WeatherIcons[data.weather[0].icon]}
                    alt={`${data.weather[0].description}-img`}
                  />
                  <p className='back__description'>
                    {data.weather[0].description}
                  </p>
                </div>
                <h3 className='back__subtitle'>More info</h3>
                <div className='back__info back__info-more'>
                  <WeatherInfo
                    icon={<FiSunrise className='icon' />}
                    name='sunrise'
                    value={convertTime(data.sys.sunrise)}
                  />
                  <WeatherInfo
                    icon={<FiSunset className='icon' />}
                    name='sunset'
                    value={convertTime(data.sys.sunset)}
                  />
                  <WeatherInfo
                    icon={<WiHumidity className='icon' />}
                    name='humidity'
                    value={data.main.humidity}
                  />
                  <WeatherInfo
                    icon={<FaWind className='icon' />}
                    name='wind'
                    value={data.wind.speed}
                  />
                </div>
              </>
            )}

            <button
              className='btn back__btn'
              onClick={backHandler}
              ref={backBtnRef}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
