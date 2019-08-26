import React from 'react';

const Weather = ({ weather }) => {
  return (
    <div>
      <p>
        <b>temperature: </b> {weather.current.temp_c} Celsius
      </p>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
      />
      <p>
        <b>wind: </b> {weather.current.wind_kph} kph direction{' '}
        {weather.current.wind_dir}
      </p>
    </div>
  );
};
export default Weather;
