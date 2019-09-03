import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useField } from "../hooks";
import BlogService from "../services/blogs";
import { connect } from "react-redux";
import { initializeBlog } from "../reducers/blogReducer";
import { login, logout, setLoggedInUser } from "../reducers/loginReducer";
import { createNotification } from "../reducers/notificationReducer";
import LoginService from "../services/login";

const Login = props => {
  const username = useField("text");
  const password = useField("password");

  const { clear: clearUserName, ...usernameOther } = username;
  const { clear: clearPassword, ...passwordOther } = password;

  const handleLogin = async e => {
    e.preventDefault();

    try {
      await props.login({
        username: username.value,
        password: password.value
      });

      const user = LoginService.getLoggedInUser();

      BlogService.setToken(user.token);
    } catch (e) {
      console.error(e);
      props.createNotification("wrong username or password", "error");
    } finally {
      username.clear();
      password.clear();
    }
  };

  const handleLogout = async e => {
    e.preventDefault();

    props.logout();
  };

  if (props.loggedUser) {
    return (
      <div>
        <p>
          {props.loggedUser.name} is logged in{" "}
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>login to application</h1>
      <form onSubmit={handleLogin}>
        <p>username: </p>
        <input {...usernameOther} />
        <p>password: </p>
        <input {...passwordOther} />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedUser: state.loggedUser
});

export default connect(
  mapStateToProps,
  { initializeBlog, login, logout, setLoggedInUser, createNotification }
)(Login);
