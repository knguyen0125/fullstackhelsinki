import React, { useState } from 'react';
import CountryDetail from './CountryDetail';

const Country = ({ country }) => {
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };
  return (
    <div>
      <div>
        {country.name}{' '}
        <button onClick={toggleDetail}>{showDetail ? 'hide' : 'show'}</button>
      </div>
      {showDetail ? <CountryDetail country={country} /> : ''}
    </div>
  );
};

export default Country;
