import { useState } from 'react';
import PropTypes from 'prop-types';

const ForgotPasswordForm = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onForgotPassword(e, email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-center mb-6">Recuperar Contraseña</h3>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Enviar Enlace de Recuperación
          </button>
        </form>
      </div>
    </div>
  );
};

ForgotPasswordForm.propTypes = {
  onForgotPassword: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;
