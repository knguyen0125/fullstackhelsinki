import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import axios from 'axios';

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const apiKey = 'e314a70b80974193865173006192608';
    axios
      .get(
        `https://api.apixu.com/v1/current.json?key=${apiKey}&q=${country.capital}`,
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.iso639_1}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name} height="100" />
      <h2>Weather in {country.capital}</h2>
      {weather ? <Weather weather={weather} /> : ''}
    </div>
  );
};

export default CountryDetail;
