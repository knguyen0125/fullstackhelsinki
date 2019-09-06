import userService from "../services/users";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case "@USERS/INIT":
      return action.data;
    default:
      return state;
  }
};

export const initializeUsers = () => async dispatch => {
  const users = await userService.getAll();

  dispatch({
    type: "@USERS/INIT",
    data: users
  });
};

export default userReducer;
