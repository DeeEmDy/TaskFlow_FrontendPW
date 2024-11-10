import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../style/LoginForm.css';

const RegisterPage = ({ onRegister }) => {
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
  const [status] = useState(true); // Estado predeterminado para el usuario
  const user_verified = false; // Valor predeterminado para el usuario
  const [errors, setErrors] = useState({}); // Para manejar errores de validación

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const signUpDto = {
      name,
      first_surname,
      second_surname,
      id_card,
      phone_number,
      email,
      password,
      user_verified,
      status,
    };

    try {
      const response = await onRegister(e, signUpDto); // Enviamos el DTO al backend
      if (response.success) {
        // Si la respuesta es exitosa
        alert(response.message); // O cualquier otra acción para éxito
      } else {
        // Si la respuesta contiene errores
        if (response.error) {
          const validationErrors = response.error.errors.reduce((acc, error) => {
            acc[error.field] = error.message;
            return acc;
          }, {});
          setErrors(validationErrors); // Establecemos los errores en el estado
        }
      }
    } catch (error) {
      // En caso de un error inesperado
      console.error('Error de conexión o servidor:', error);
      alert('Hubo un problema al registrar el usuario. Intente nuevamente.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Ingrese su nombre aquí"
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="first_surname" className="form-label">Primer Apellido</label>
              <input
                type="text"
                id="first_surname"
                name="first_surname"
                value={first_surname}
                onChange={(e) => setFirstSurname(e.target.value)}
                className={`form-control ${errors.first_surname ? 'is-invalid' : ''}`}
                placeholder="Ingrese su primer apellido aquí"
              />
              {errors.first_surname && <div className="invalid-feedback">{errors.first_surname}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="second_surname" className="form-label">Segundo Apellido</label>
              <input
                type="text"
                id="second_surname"
                name="second_surname"
                value={second_surname}
                onChange={(e) => setSecondSurname(e.target.value)}
                className={`form-control ${errors.second_surname ? 'is-invalid' : ''}`}
                placeholder="Ingrese su segundo apellido aquí"
              />
              {errors.second_surname && <div className="invalid-feedback">{errors.second_surname}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="id_card" className="form-label">Número de cédula</label>
              <input
                type="text"
                id="id_card"
                name="id_card"
                value={id_card}
                onChange={(e) => setIdCard(e.target.value)}
                className={`form-control ${errors.id_card ? 'is-invalid' : ''}`}
                placeholder="Ingrese su número de cédula aquí"
              />
              {errors.id_card && <div className="invalid-feedback">{errors.id_card}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="phone_number" className="form-label">Número de teléfono</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
                placeholder="Ingrese su número de teléfono aquí"
              />
              {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Ingrese su correo electrónico aquí"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-control pe-5 ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Ingrese su contraseña aquí"
              />
              <button
                type="button"
                className="btn-password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="confirm_password" className="form-label">Confirmar contraseña</label>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirm_password"
                name="confirm_password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`form-control pe-5 ${errors.confirm_password ? 'is-invalid' : ''}`}
                placeholder="Confirme su contraseña aquí"
              />
              <button
                type="button"
                className="btn-password-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

RegisterPage.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterPage;
