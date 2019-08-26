import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import CountryDetail from './components/CountryDetail';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('af');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  const countryDisplay = () => {
    if (search.length === 0) {
      return <div />;
    }

    if (countriesToShow.length >= 10) {
      return <div>Too many matches, specify another filter</div>;
    }

    if (countriesToShow.length === 1) {
      return <CountryDetail country={countriesToShow[0]} />;
    }

    return (
      <div>
        {countriesToShow.map((country) => (
          <Country key={country.name} country={country} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>
        find countries <input onChange={handleSearch} value={search} />
      </div>
      {countryDisplay()}
    </div>
  );
};

export default App;
