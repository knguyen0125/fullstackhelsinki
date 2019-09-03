import loginService from "../services/login";

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "@LOGIN/SET":
      return action.data;
    case "@LOGIN/LOGOUT":
      return null;
    default:
      return state;
  }
};

export const setLoggedInUser = user => ({
  type: "@LOGIN/SET",
  data: user
});

export const login = ({ username, password }) => async dispatch => {
  console.log(username, password);
  const loggedInUser = await loginService.login({ username, password });

  dispatch(setLoggedInUser(loggedInUser));
};

export const logout = () => dispatch => {
  loginService.logout();

  dispatch({
    type: "@LOGIN/LOGOUT"
  });
};

export default loginReducer;
