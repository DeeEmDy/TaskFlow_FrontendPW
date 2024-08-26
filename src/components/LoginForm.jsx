import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
    <div className="flex justify-center py-4">
      <div className="w-full max-w-md">
        <ul className="flex justify-between mb-4">
          <li>
            <button
              className={`py-2 px-4 border rounded-md w-full ${active === 'login' ? 'bg-blue-600 text-white' : ''}`}
              onClick={() => setActive('login')}
            >
              Login
            </button>
          </li>
          <li>
            <button
              className={`py-2 px-4 border rounded-md w-full ${active === 'register' ? 'bg-blue-600 text-white' : ''}`}
              onClick={() => setActive('register')}
            >
              Register
            </button>
          </li>
        </ul>

        <div className="bg-white p-6 rounded-md shadow-md">
          {active === 'login' ? (
            <form onSubmit={onSubmitHandler}>
              <div className="mb-4 relative">
                <input
                  type="text"
                  id="loginName"
                  name="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="w-full p-3 border rounded-md"
                  placeholder="Username"
                />
              </div>

              <div className="mb-4 relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="loginPassword"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border rounded-md pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md">
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={onSubmitRegister}>
              <div className="mb-4 relative">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border rounded-md"
                  placeholder="First Name"
                />
              </div>

              <div className="mb-4 relative">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 border rounded-md"
                  placeholder="Last Name"
                />
              </div>

              <div className="mb-4 relative">
                <input
                  type="text"
                  id="login"
                  name="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="w-full p-3 border rounded-md"
                  placeholder="Username"
                />
              </div>

              <div className="mb-4 relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border rounded-md pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md">
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Añadimos PropTypes para validar las props
LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default LoginForm;
