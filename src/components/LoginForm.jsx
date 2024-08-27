import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../style/LoginForm.css';

const LoginForm = ({ onLogin, onRegister }) => {
  const [active, setActive] = useState('login');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onLogin(e, login, password);
  };

  const onSubmitRegister = (e) => {
    e.preventDefault();
    onRegister(e, firstName, lastName, login, password);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <ul className="nav nav-pills">
            <button
              className={`nav-link ${active === 'login' ? 'active' : ''}`}
              onClick={() => setActive('login')}
            >
              Login
            </button>
            <button
              className={`nav-link ${active === 'register' ? 'active' : ''}`}
              onClick={() => setActive('register')}
            >
              Register
            </button>
          </ul>

          {active === 'login' ? (
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="login" className="form-label">Username</label>
                <input
                  type="text"
                  id="login"
                  name="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="form-control"
                  placeholder="Username"
                />
              </div>

              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="btn-password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={onSubmitRegister}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-control"
                  placeholder="First Name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="login" className="form-label">Username</label>
                <input
                  type="text"
                  id="login"
                  name="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="form-control"
                  placeholder="Username"
                />
              </div>

              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="btn-password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default LoginForm;
