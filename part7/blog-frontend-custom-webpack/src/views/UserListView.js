import React from "react";
import { connect } from "react-redux";
import UsersList from "../components/block/UserList";

const UserListView = props => {
  return <UsersList users={props.users} />;
};

export default connect(state => ({ users: state.users }))(UserListView);
