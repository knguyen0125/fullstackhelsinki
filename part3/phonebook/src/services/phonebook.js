import axios from 'axios';

const baseURL = 'http://localhost:3001/api/persons';

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const createPerson = (person) => {
  return axios.post(baseURL, person).then((response) => response.data);
};

const updatePerson = (id, person) => {
  return axios
    .put(`${baseURL}/${id}`, person)
    .then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((response) => response.data);
};

export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson,
};
