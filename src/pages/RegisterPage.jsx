import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Importar SweetAlert2
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

  const validateFields = () => {
    const validationErrors = {};
    // Validación de campos obligatorios
    if (!name) validationErrors.name = 'El nombre es obligatorio';
    if (!first_surname) validationErrors.first_surname = 'El primer apellido es obligatorio';
    if (!second_surname) validationErrors.second_surname = 'El segundo apellido es obligatorio';
    if (!id_card) validationErrors.id_card = 'El número de cédula es obligatorio';
    if (!phone_number) validationErrors.phone_number = 'El número de teléfono es obligatorio';
    if (!email) validationErrors.email = 'El correo electrónico es obligatorio';
    if (!password) validationErrors.password = 'La contraseña es obligatoria';
    if (!confirm_password) validationErrors.confirm_password = 'Debe confirmar su contraseña';

    // Validación de contraseñas
    if (password && confirm_password && password !== confirm_password) {
      validationErrors.confirm_password = 'Las contraseñas no coinciden';
    }

    return validationErrors;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const signUpDto = {
      name,
      first_surname,
      second_surname,
      id_card,
      phone_number,
      email,
      password,
      confirm_password,
      user_verified,
      status,
    };

    try {
      const response = await onRegister(signUpDto); // Enviamos el DTO al backend
      if (response.success) {
        Swal.fire('¡Éxito!', response.message, 'success'); // Mensaje de éxito
      } else {
        // Mostrar los errores del backend usando SweetAlert
        if (response.error) {
          const validationErrors = response.error.errors.reduce((acc, error) => {
            acc[error.field] = error.message;
            return acc;
          }, {});
          setErrors(validationErrors); // Establecemos los errores en el estado
          Swal.fire('Error', 'Hubo un problema al registrar el usuario.', 'error'); // Mensaje de error general
        }
      }
    } catch (error) {
      // En caso de un error inesperado
      console.error('Error de conexión o servidor:', error);
      Swal.fire('Error', 'Hubo un problema al registrar el usuario. Intente nuevamente.', 'error');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <form onSubmit={onSubmitHandler}>
            {/* Nombre */}
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
                required
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              <small className="form-text text-muted">Requiere nombre completo.</small>
            </div>

            {/* Primer Apellido */}
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
                required
              />
              {errors.first_surname && <div className="invalid-feedback">{errors.first_surname}</div>}
              <small className="form-text text-muted">Ingrese su primer apellido.</small>
            </div>

            {/* Segundo Apellido */}
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
                required
              />
              {errors.second_surname && <div className="invalid-feedback">{errors.second_surname}</div>}
              <small className="form-text text-muted">Ingrese su segundo apellido.</small>
            </div>

            {/* Número de Cédula */}
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
                required
              />
              {errors.id_card && <div className="invalid-feedback">{errors.id_card}</div>}
              <small className="form-text text-muted">Requiere una cédula válida.</small>
            </div>

            {/* Número de Teléfono */}
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
                required
              />
              {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
              <small className="form-text text-muted">Ingrese su número de teléfono.</small>
            </div>

            {/* Correo electrónico */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Ingrese su correo electrónico aquí"
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              <small className="form-text text-muted">Ingrese un correo electrónico válido.</small>
            </div>

            {/* Contraseña */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <div className="input-group">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Ingrese su contraseña"
                  required
                />
                <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              <small className="form-text text-muted">Debe contener al menos 8 caracteres.</small>
            </div>

            {/* Confirmar Contraseña */}
            <div className="mb-3">
              <label htmlFor="confirm_password" className="form-label">Confirmar contraseña</label>
              <div className="input-group">
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  id="confirm_password"
                  name="confirm_password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
                  placeholder="Confirme su contraseña"
                  required
                />
                <button type="button" className="btn btn-outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password}</div>}
            </div>

            {/* Botón de Enviar */}
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Registrar</button>
            </div>
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
