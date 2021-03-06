import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return <div className={notification.type}>{notification.message}</div>;
};

Notification.propTypes = {
  notification: PropTypes.object
};

const mapStateToProps = state => ({
  notification: state.notification
});

export default connect(mapStateToProps)(Notification);
