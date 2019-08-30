import React from 'react';
import PropTypes from 'prop-types';

const Login = ({
  username,
  password,
  // handleUsername,
  // handlePassword,
  handleLogin,
}) => {
  const handleLogout = async (e) => {
    e.preventDefault();

    window.localStorage.removeItem('loggedUser');

    console.log(window.localStorage);
  };

  return (
    <div>
      <h1>login to application</h1>
      <form onSubmit={handleLogin}>
        <p>username: </p>
        <input
          type={username.type}
          value={username.value}
          onChange={username.onChange}
        />
        <p>password: </p>
        <input
          type={password.type}
          value={password.value}
          onChange={password.onChange}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};
Login.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
};
export default Login;
