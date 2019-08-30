// import { useState } from 'react';
import axios from 'axios';

const useResource = (resource) => {
  let token = null;

  const setToken = (newToken) => {
    token = `bearer ${newToken}`;
  };

  const getAll = async () => {
    const response = await axios.get(resource);
    return response.data;
  };

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(resource, newObject, config);
    return response.data;
  };

  return {
    setToken,
    getAll,
    create,
  };
};

export default {
  useResource,
};
