import axios from "axios";

const baseUrl = "/api/login";

const login = async ({ username, password }) => {
  const response = await axios.post(baseUrl, { username, password });

  window.localStorage.setItem("loggedUser", JSON.stringify(response.data));

  return response.data;
};

const logout = () => {
  window.localStorage.removeItem("loggedUser");
};

const getLoggedInUser = () => {
  const loggedUser = window.localStorage.getItem("loggedUser");
  return JSON.parse(loggedUser);
};

export default { login, logout, getLoggedInUser };
