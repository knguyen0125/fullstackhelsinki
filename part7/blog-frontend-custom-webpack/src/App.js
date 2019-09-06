import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import LoginService from "./services/login";
import BlogService from "./services/blogs";

import Notification from "./components/element/Notification";
import Header from "./components/ui/Header";
import { Container } from "./components/ui";
import Routes from "./routes/Routes";

import GlobalStyle, { theme } from "./styles";

import { initializeBlog } from "./reducers/blogReducer";
import { setLoggedInUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import { ThemeProvider } from "styled-components";

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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <div>
          <Header />
          <Container>
            <Notification />
            <Routes />
          </Container>
        </div>
      </Router>
    </ThemeProvider>
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
