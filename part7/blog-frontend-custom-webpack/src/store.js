import { applyMiddleware, combineReducers, createStore } from "redux";
import notificationReducer from "./reducers/notificationReducer";
import thunk from "redux-thunk";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";

const reducers = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  loggedUser: loginReducer,
  users: userReducer
});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
