import React from 'react';
import PropTypes from 'prop-types';

const Login = ({
  username,
  password,
  handleUsername,
  handlePassword,
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
        <input type="text" value={username} onChange={handleUsername} />
        <p>password: </p>
        <input type="password" value={password} onChange={handlePassword} />
        <button type="submit">login</button>
      </form>
    </div>
  );
};
Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};
export default Login;
