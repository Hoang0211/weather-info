import React from "react";

function WeatherInfo(props) {
  return (
    <div className="info-container">
      {props.icon}
      <div className="info">
        <span className="info__value">{props.value}</span>
        <span className="info__name">{props.name}</span>
      </div>
    </div>
  );
}

export default WeatherInfo;
