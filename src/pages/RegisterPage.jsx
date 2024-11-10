import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { registerUser } from '../service/Auth/RegisterUser';
import '../style/LoginForm.css';

const RegisterPage = () => {
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
  const [status] = useState(true);
  const user_verified = false;
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const validateFields = () => {
    const validationErrors = {};
    const namePattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ´ ]+$/;
    const surnamePattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ´ ]+$/;
    const idCardPattern = /^\d{9,12}$/;
    const phonePattern = /^\+?\d{8,15}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name) validationErrors.name = 'El nombre es obligatorio';
    else if (!namePattern.test(name)) validationErrors.name = 'El nombre solo puede contener letras y espacios';

    if (!first_surname) validationErrors.first_surname = 'El primer apellido es obligatorio';
    else if (!surnamePattern.test(first_surname)) validationErrors.first_surname = 'El primer apellido solo puede contener letras y espacios';

    if (!second_surname) validationErrors.second_surname = 'El segundo apellido es obligatorio';
    else if (!surnamePattern.test(second_surname)) validationErrors.second_surname = 'El segundo apellido solo puede contener letras y espacios';

    if (!id_card) validationErrors.id_card = 'El número de cédula es obligatorio';
    else if (!idCardPattern.test(id_card)) validationErrors.id_card = 'El número de cédula debe tener entre 9 y 12 dígitos';

    if (!phone_number) validationErrors.phone_number = 'El número de teléfono es obligatorio';
    else if (!phonePattern.test(phone_number)) validationErrors.phone_number = 'El número de teléfono debe ser válido y contener entre 8 y 15 dígitos';

    if (!email) validationErrors.email = 'El correo electrónico es obligatorio';
    else if (!emailPattern.test(email)) validationErrors.email = 'El correo electrónico debe ser válido';

    if (!password) validationErrors.password = 'La contraseña es obligatoria';
    if (!confirm_password) validationErrors.confirm_password = 'Debe confirmar su contraseña';
    if (password && confirm_password && password !== confirm_password) validationErrors.confirm_password = 'Las contraseñas no coinciden';

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
      const response = await registerUser(signUpDto);
      if (response.success) {
        Swal.fire('¡Éxito!', response.data.message || 'Registro exitoso', 'success');
      } else {
        // Mostrar los errores del backend usando SweetAlert y actualizar los errores en el formulario
        if (response.error && response.error.errors) {
          const backendErrors = response.error.errors.reduce((acc, err) => {
            acc[err.field] = err.message;
            return acc;
          }, {});
          setErrors(backendErrors);  // Actualiza los errores en el estado
          const errorMessages = response.error.errors.map((err) => `${err.field}: ${err.message}`).join('\n');
          Swal.fire('Error', `Hubo un problema al registrar el usuario:\n${errorMessages}`, 'error');
        } else {
          Swal.fire('Error', 'Hubo un problema al registrar el usuario.', 'error');
        }
      }
    } catch (error) {
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
            </div>

            {/* Correo Electrónico */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
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
                  placeholder="Ingrese su contraseña aquí"
                  required
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Confirmar Contraseña */}
            <div className="mb-3">
              <label htmlFor="confirm_password" className="form-label">Confirmar Contraseña</label>
              <div className="input-group">
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  id="confirm_password"
                  name="confirm_password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
                  placeholder="Confirme su contraseña aquí"
                  required
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
