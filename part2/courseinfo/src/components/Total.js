import React from 'react';

const Total = ({ parts }) => {
  const total_exercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <b>total of {total_exercises} exercises</b>
    </p>
  );
};

export default Total;
