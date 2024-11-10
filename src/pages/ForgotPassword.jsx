import { useState } from 'react';
import PropTypes from 'prop-types';

const ForgotPasswordPage = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Llamamos a la función recibida como prop
    if (onForgotPassword) {
      onForgotPassword(email); // Llamamos la función que se pasa como prop con el email
    } else {
      console.error("No se proporcionó la función onForgotPassword.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h3>Recuperar Contraseña</h3>
          <form onSubmit={onSubmitHandler}>
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
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Enviar enlace de recuperación
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Definimos PropTypes para la validación de las props
ForgotPasswordPage.propTypes = {
  onForgotPassword: PropTypes.func.isRequired, // onForgotPassword debe ser una función y es requerida
};

export default ForgotPasswordPage;
