import React, { useState, useEffect } from 'react';
import phoneBook from './services/phonebook';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    phoneBook.getAll().then((initialData) => {
      setPersons(initialData);
    });
  }, []);

  const reset = () => {
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAdd = (event) => {
    event.preventDefault();

    let existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );

    if (existingPerson) {
      // createNotification(`${newName} is already in the phonebook`, 'error');
      const updatePerson = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`,
      );

      if (updatePerson) {
        const personObject = {
          ...existingPerson,
          number: newNumber,
        };

        phoneBook
          .updatePerson(existingPerson.id, personObject)
          .then((updatedPerson) => {
            createNotification(
              `Number of ${existingPerson.name} changed`,
              'success',
            );
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson,
              ),
            );
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      phoneBook
        .createPerson(personObject)
        .then((newPerson) => {
          createNotification(`Added ${newName}`, 'success');
          setPersons(persons.concat(newPerson));
        })
        .catch((error) => {
          console.log(error);
          createNotification(error.response.data.error, 'error');
        });
    }

    reset();
  };

  const handleDelete = (deletedPerson) => () => {
    const confirmDelete = window.confirm(`Delete ${deletedPerson.name}?`);
    if (confirmDelete) {
      phoneBook
        .deletePerson(deletedPerson.id)
        .then(() => {
          createNotification(
            `Information of ${deletedPerson.name} is successfully removed from server`,
            'success',
          );
          setPersons(
            persons.filter((person) => person.id !== deletedPerson.id),
          );
        })
        .catch(() => {
          createNotification(
            `Information of ${deletedPerson.name} has already been removed from server`,
            'error',
          );
          setPersons(
            persons.filter((person) => person.id !== deletedPerson.id),
          );
        });
    }
  };

  const createNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const peopleToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm),
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter handler={handleSearchChange} value={searchTerm} />
      <h2>add a new</h2>
      <PersonForm
        nameHandler={handleNameChange}
        name={newName}
        phoneHandler={handlePhoneChange}
        phone={newNumber}
        addHandler={handleAdd}
      />
      <h2>Numbers</h2>
      <Persons people={peopleToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
