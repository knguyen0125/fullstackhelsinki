import React from 'react';

const Filter = ({ handler, value }) => {
  return (
    <div>
      <div>
        filter shown with
        <input onChange={handler} value={value} />
      </div>
    </div>
  );
};

export default Filter;
