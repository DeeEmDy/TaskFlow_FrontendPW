import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';  // Importamos useMutation
import { registerUser } from '../service/Auth/RegisterUser';  // Servicio de registro
import '../style/LoginForm.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [firstSurname, setFirstSurname] = useState('');
  const [secondSurname, setSecondSurname] = useState('');
  const [idCard, setIdCard] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [status] = useState(true);
  const user_verified = false;
  const [errors, setErrors] = useState({});

  // Mutación para el registro de usuario
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registro exitoso:", data); // Depuración
      Swal.fire('¡Éxito!', data.message || 'Registro exitoso', 'success');
    },
    onError: (error) => {
      console.error("Error en la mutación:", error); // Depuración
      const backendErrors = error?.response?.data?.errors || [];
      const errorMessages = backendErrors.map(err => `${err.field}: ${err.message}`).join('\n');
      Swal.fire('Error', `Hubo un problema al registrar el usuario:\n${errorMessages}`, 'error');
      setErrors(
        backendErrors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {})
      );
    },
  });
  
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

    if (!firstSurname) validationErrors.firstSurname = 'El primer apellido es obligatorio';
    else if (!surnamePattern.test(firstSurname)) validationErrors.firstSurname = 'El primer apellido solo puede contener letras y espacios';

    if (!secondSurname) validationErrors.secondSurname = 'El segundo apellido es obligatorio';
    else if (!surnamePattern.test(secondSurname)) validationErrors.secondSurname = 'El segundo apellido solo puede contener letras y espacios';

    if (!idCard) validationErrors.idCard = 'El número de cédula es obligatorio';
    else if (!idCardPattern.test(idCard)) validationErrors.idCard = 'El número de cédula debe tener entre 9 y 12 dígitos';

    if (!phoneNumber) validationErrors.phoneNumber = 'El número de teléfono es obligatorio';
    else if (!phonePattern.test(phoneNumber)) validationErrors.phoneNumber = 'El número de teléfono debe ser válido y contener entre 8 y 15 dígitos';

    if (!email) validationErrors.email = 'El correo electrónico es obligatorio';
    else if (!emailPattern.test(email)) validationErrors.email = 'El correo electrónico debe ser válido';

    if (!password) validationErrors.password = 'La contraseña es obligatoria';
    if (!confirmPassword) validationErrors.confirmPassword = 'Debe confirmar su contraseña';
    if (password && confirmPassword && password !== confirmPassword) validationErrors.confirmPassword = 'Las contraseñas no coinciden';

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
      firstSurname,
      secondSurname,
      idCard,
      phoneNumber,
      email,
      password,
      confirmPassword,
      user_verified,
      status,
    };

    // Realizamos la mutación para registrar al usuario
    mutation.mutate(signUpDto);  // Usamos mutate de useMutation para enviar la solicitud
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
              <label htmlFor="firstSurname" className="form-label">Primer Apellido</label>
              <input
                type="text"
                id="firstSurname"
                name="firstSurname"
                value={firstSurname}
                onChange={(e) => setFirstSurname(e.target.value)}
                className={`form-control ${errors.firstSurname ? 'is-invalid' : ''}`}
                placeholder="Ingrese su primer apellido aquí"
                required
              />
              {errors.firstSurname && <div className="invalid-feedback">{errors.firstSurname}</div>}
            </div>

            {/* Segundo Apellido */}
            <div className="mb-3">
              <label htmlFor="secondSurname" className="form-label">Segundo Apellido</label>
              <input
                type="text"
                id="secondSurname"
                name="secondSurname"
                value={secondSurname}
                onChange={(e) => setSecondSurname(e.target.value)}
                className={`form-control ${errors.secondSurname ? 'is-invalid' : ''}`}
                placeholder="Ingrese su segundo apellido aquí"
                required
              />
              {errors.secondSurname && <div className="invalid-feedback">{errors.secondSurname}</div>}
            </div>

            {/* Número de Cédula */}
            <div className="mb-3">
              <label htmlFor="idCard" className="form-label">Número de cédula</label>
              <input
                type="text"
                id="idCard"
                name="idCard"
                value={idCard}
                onChange={(e) => setIdCard(e.target.value)}
                className={`form-control ${errors.idCard ? 'is-invalid' : ''}`}
                placeholder="Ingrese su número de cédula aquí"
                required
              />
              {errors.idCard && <div className="invalid-feedback">{errors.idCard}</div>}
            </div>

            {/* Número de Teléfono */}
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Número de teléfono</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                placeholder="Ingrese su número de teléfono aquí"
                required
              />
              {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
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
                <button type="button" onClick={togglePasswordVisibility} className="btn btn-outline-secondary">
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Confirmar Contraseña */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
              <div className="input-group">
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="Confirme su contraseña aquí"
                  required
                />
                <button type="button" onClick={toggleConfirmPasswordVisibility} className="btn btn-outline-secondary">
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            {/* Botón de Registro */}
            <button type="submit" className="btn btn-primary w-100">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
