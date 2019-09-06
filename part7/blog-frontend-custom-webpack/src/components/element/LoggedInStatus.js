import React from "react";
import { connect } from "react-redux";
import { logout } from "../../reducers/loginReducer";

const LoggedInStatus = props => {
  const handleLogout = async e => {
    e.preventDefault();

    props.logout();
  };

  if (props.loggedUser) {
    return (
      <span>
        Welcome, {props.loggedUser.name}
        <button onClick={handleLogout}>logout</button>
      </span>
    );
  }

  return null;
};

export default connect(
  state => ({ loggedUser: state.loggedUser }),
  { logout }
)(LoggedInStatus);
