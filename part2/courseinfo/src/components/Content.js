import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  const rows = () => parts.map((part) => <Part part={part} key={part.id} />);

  return <div>{rows()}</div>;
};

export default Content;
