import React from 'react';

const Persons = ({ people, handleDelete }) => {
  return (
    <div>
      {people.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{' '}
          <button onClick={handleDelete(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
