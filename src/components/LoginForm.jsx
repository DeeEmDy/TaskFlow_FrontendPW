import React, { useState } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../style/LoginForm.css';
import { emailRegex, passwordRegex, phoneRegex } from '../assets/ExpresionesRegulares/ExpresionesRegularesValidacion';

const LoginForm = ({
  onLogin,
  onRegister,
  errorMessage = '', // Parámetro por defecto
  confirmPassword = '', // Parámetro por defecto
  setConfirmPassword,
  setErrorMessage,
}) => {
  const [active, setActive] = useState('login');
  const [name, setName] = useState('');
  const [firstSurname, setFirstSurname] = useState('');
  const [secondSurname, setSecondSurname] = useState('');
  const [idCard, setIdCard] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setErrorMessage('Correo electrónico inválido.');
      return;
    }
    if (!password) {
      setErrorMessage('La contraseña es requerida.');
      return;
    }
    setErrorMessage(''); // Limpiar el mensaje de error si todo es válido
    onLogin(e, email, password);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setErrorMessage('Correo electrónico inválido.');
      return;
    }
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage('Número de teléfono inválido.');
      return;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage('La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, una minúscula y un número.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }
    setErrorMessage(''); // Limpiar el mensaje de error si todo es válido
    onRegister(e, name, firstSurname, secondSurname, idCard, phoneNumber, email, password, confirmPassword, false, true);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <ul className="nav nav-pills">
            <button
              className={`nav-link ${active === 'login' ? 'active' : ''}`}
              onClick={() => setActive('login')}
              aria-selected={active === 'login'}
            >
              Inicio de Sesión
            </button>
            <button
              className={`nav-link ${active === 'register' ? 'active' : ''}`}
              onClick={() => setActive('register')}
              aria-selected={active === 'register'}
            >
              Registrarse
            </button>
          </ul>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          {active === 'login' ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su correo electrónico aquí"
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su contraseña aquí"
                  required
                />
                <button
                  type="button"
                  className="btn-password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Iniciar Sesión
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su nombre aquí"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="firstSurname" className="form-label">Primer Apellido</label>
                <input
                  type="text"
                  id="firstSurname"
                  name="firstSurname"
                  value={firstSurname}
                  onChange={(e) => setFirstSurname(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su primer apellido aquí"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="secondSurname" className="form-label">Segundo Apellido</label>
                <input
                  type="text"
                  id="secondSurname"
                  name="secondSurname"
                  value={secondSurname}
                  onChange={(e) => setSecondSurname(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su segundo apellido aquí"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="idCard" className="form-label">Número de cédula</label>
                <input
                  type="text"
                  id="idCard"
                  name="idCard"
                  value={idCard}
                  onChange={(e) => setIdCard(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su número de cédula aquí"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Número de teléfono</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su número de teléfono aquí"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su correo electrónico aquí"
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su contraseña aquí"
                  required
                />
                <button
                  type="button"
                  className="btn-password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="mb-3 position-relative">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                  placeholder="Confirme su contraseña aquí"
                  required
                />
                <button
                  type="button"
                  className="btn-password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label={confirmPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Registrarse
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
  errorMessage: PropTypes.string,
  confirmPassword: PropTypes.string,
  setConfirmPassword: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default LoginForm;
