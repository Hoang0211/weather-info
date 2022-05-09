import React from 'react';

function WeatherInfo({ icon, value, name }) {
  return (
    <div className='info'>
      {icon}
      <span className='info__value'>{value}</span>
      <span className='info__name'>{name}</span>
    </div>
  );
}

export default WeatherInfo;
