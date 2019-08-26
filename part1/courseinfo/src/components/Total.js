import React from 'react';

const Total = (props) => {
  const total_exercises =
    props.parts[0].exercises +
    props.parts[1].exercises +
    props.parts[2].exercises;
  return <p>Number of exercises {total_exercises}</p>;
};

export default Total;
