import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginService from "./services/login";
import BlogService from "./services/blogs";

import Login from "./components/Login";
import BlogCreation from "./components/BlogCreation";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import Menu from "./components/Menu";

import { initializeBlog } from "./reducers/blogReducer";
import { setLoggedInUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";

function App(props) {
  console.log(props);
  useEffect(() => {
    const loggedUser = LoginService.getLoggedInUser();

    if (loggedUser) {
      props.setLoggedInUser(loggedUser);
      BlogService.setToken(loggedUser.token);
    }
  }, []);

  useEffect(() => {
    props.initializeBlog();
    props.initializeUsers();
  }, []);

  const loggedInPage = () => (
    <>
      <Toggleable buttonLabel="new blog">
        <BlogCreation />
      </Toggleable>
      <div className="blogs">
        <BlogList />
      </div>
    </>
  );

  return (
    <Router>
      <div className="App">
        <h1>blogs</h1>
        <Menu />
        <Login />
        <Notification />
        <Route
          exact
          path={"/"}
          render={() => (
            <>
              {props.loggedUser !== null && loggedInPage()}
            </>
          )}
        />
        <Route exact path={"/users"} render={() => <Users />} />
        <Route
          path={"/users/:id"}
          render={({ match }) => (
            <User
              user={props.users.find(user => user.id === match.params.id)}
            />
          )}
        />
        <Route
          path={"/blogs/:id"}
          render={({ match }) => (
            <Blog
              blog={props.blogs.find(blog => blog.id === match.params.id)}
            />
          )}
        />
        {/*<Users />*/}
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  loggedUser: state.loggedUser,
  blogs: state.blogs,
  users: state.users
});

export default connect(
  mapStateToProps,
  { initializeBlog, setLoggedInUser, initializeUsers }
)(App);
