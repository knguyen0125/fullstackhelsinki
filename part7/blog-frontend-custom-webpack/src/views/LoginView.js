import React from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/element/LoginForm";
import { connect } from "react-redux";

const LoginView = props => {
  const { from } = props.location.state || { from: { pathname: "/" } };
  if (props.authenticated) {
    return <Redirect to={from} />;
  }

  return <LoginForm />;
};

export default connect(state => ({
  authenticated: state.loggedUser !== null
}))(LoginView);
