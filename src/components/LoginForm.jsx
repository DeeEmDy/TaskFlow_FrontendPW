import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../style/LoginForm.css';

const LoginForm = ({ onLogin, onRegister }) => {
  const [active, setActive] = useState('login');
  const [name, setName] = useState('');
  const [first_surname, setFirstSurname] = useState('');
  const [second_surname, setSecondSurname] = useState('');
  const [id_card, setIdCard] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onLogin(e, email, password);
  };

  const onSubmitRegister = (e) => {
    e.preventDefault();
    onRegister(e, name, first_surname, second_surname, id_card, phone_number, email, password);
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
              Inicio de Sesión
            </button>
            <button
              className={`nav-link ${active === 'register' ? 'active' : ''}`}
              onClick={() => setActive('register')}
            >
              Registrarse
            </button>
          </ul>

          {active === 'login' ? (
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su correo electrónico aquí"
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
                />
                <button
                  type="button"
                  className="btn-password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

                  {/* Enlace de "Olvido de contraseña" */}
              <div className="mb-3">
                <a href="/forgotPassword" className="forgot-password-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Iniciar Sesión
              </button>
            </form>
          ) : (
            <form onSubmit={onSubmitRegister}>
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
                />
              </div>

              <div className="mb-3">
                <label htmlFor="first_surname" className="form-label">Primer Apellido</label>
                <input
                  type="text"
                  id="first_surname"
                  name="first_surname"
                  value={first_surname}
                  onChange={(e) => setFirstSurname(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su primer apellido aquí"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="second_surname" className="form-label">Segundo Apellido</label>
                <input
                  type="text"
                  id="second_surname"
                  name="second_surname"
                  value={second_surname}
                  onChange={(e) => setSecondSurname(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su segundo apellido aquí"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="id_card" className="form-label">Número de cédula</label>
                <input
                  type="text"
                  id="id_card"
                  name="id_card"
                  value={id_card}
                  onChange={(e) => setIdCard(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su número de cédula aquí"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone_number" className="form-label">Número de teléfono</label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su número de teléfono aquí"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Ingrese su correo electrónico aquí"
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
                  className="form-control pe-5" // Añado la clase pe-5 para espacio a la derecha
                  placeholder="Ingrese su contraseña aquí"
                />
                <button
                  type="button"
                  className="btn-password-toggle" // Clase personalizada para posicionar el botón
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="mb-3 position-relative">
                <label htmlFor="confirm_password" className="form-label">Confirmar contraseña</label>
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  id="confirm_password"
                  name="confirm_password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control pe-5" // Añado la clase pe-5 para espacio a la derecha
                  placeholder="Confirme su contraseña aquí"
                />
                <button
                  type="button"
                  className="btn-password-toggle" // Clase personalizada para posicionar el botón
                  onClick={toggleConfirmPasswordVisibility}
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
};

export default LoginForm;
