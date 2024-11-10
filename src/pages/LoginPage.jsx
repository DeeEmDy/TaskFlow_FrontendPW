import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Usamos el hook useNavigate para redirigir
import '../style/LoginForm.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate(); // Usamos el hook useNavigate para redirigir

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onLogin(e, email, password);
  };

  const redirectToForgotPassword = () => {
    navigate('/forgotPassword');  // Redirigir a la página ForgotPassword
  };

  const redirectToRegister = () => {
    navigate('/register'); // Redirigir a la página de registro
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h3>Inicio de Sesión</h3>
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

            <div className="mb-3">
              <a href="#" onClick={redirectToForgotPassword} className="forgot-password-link">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </form>

          {/* Agregar el enlace de redirección a la página de registro con el mismo estilo que "Olvidaste tu contraseña" */}
          <div className="text-center mt-3">
            <a href="#" onClick={redirectToRegister} className="forgot-password-link">
              ¿No estás registrado? Regístrate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
