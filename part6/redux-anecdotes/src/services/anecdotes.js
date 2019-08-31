import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async content => {
  const anecdote = asObject(content);
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const like = async id => {
  const { data: anecdote } = await axios.get(`${baseUrl}/${id}`);
  const newAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  };

  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote);

  return response.data;
};

export default { getAll, createNew, like };
