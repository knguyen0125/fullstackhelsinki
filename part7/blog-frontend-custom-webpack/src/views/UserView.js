import React from "react";
import User from "../components/element/User";
import { connect } from "react-redux";

const UserView = props => {
  console.log("USERVIEW", props);
  return (
    <User user={props.users.find(user => user.id === props.match.params.id)} />
  );
};

export default connect(state => ({ users: state.users }))(UserView);
