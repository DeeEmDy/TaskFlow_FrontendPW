import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';  // Importamos useMutation
import { registerUser } from '../service/Auth/RegisterUser';  // Servicio de registro
import '../style/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { emailRegex, phoneRegex, nameRegex, passwordRegex, confirmPasswordRegex, idCardRegex } from '../assets/ExpresionesRegulares/ExpresionesRegularesValidacion';

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
  const [isLoading, setIsLoading] = useState(false);  // Para manejar el estado de carga

  const navigate = useNavigate(); // Hook para la redirección

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      Swal.fire({
        title: '¡Éxito!',
        text: data.message || 'Registro exitoso',
        icon: 'success',
        timer: 4500,
        showConfirmButton: false,
      }).then(() => {
        // Limpiar los campos del formulario
        setName('');
        setFirstSurname('');
        setSecondSurname('');
        setIdCard('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
  
        // Redirigir al login
        navigate('/login');
      });
    },
    onError: (error) => {
      // Mostrar el mensaje de error
      Swal.fire({
        title: 'Error',
        text: error.error?.message || 'Hubo un problema al registrar el usuario',
        icon: 'error',
        timer: 4500,
        showConfirmButton: false,
      });
  
      // Si hay errores de validación, actualizamos el estado de errores
      if (error.error?.errors?.length > 0) {
        setErrors(
          error.error.errors.reduce((acc, err) => {
            acc[err.field] = err.message;
            return acc;
          }, {})
        );
      }
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const validateName = (name) => {
    if (!name) return 'El nombre es obligatorio';
    if (!nameRegex.test(name)) return 'El nombre solo puede contener letras y espacios';
    return null;
  };

  const validateSurname = (surname) => {
    if (!surname) return 'El apellido es obligatorio';
    if (!nameRegex.test(surname)) return 'El apellido solo puede contener letras y espacios';
    return null;
  };

  const validateIdCard = (idCard) => {
    if (!idCard) return 'El número de cédula es obligatorio';
    if (!idCardRegex.test(idCard)) return 'El número de cédula debe tener entre 9 y 12 dígitos';
    return null;
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return 'El número de teléfono es obligatorio';
    if (!phoneRegex.test(phoneNumber)) return 'El número de teléfono debe ser válido y contener entre 8 y 15 dígitos';
    return null;
  };

  const validateEmail = (email) => {
    if (!email) return 'El correo electrónico es obligatorio';
    if (!emailRegex.test(email)) return 'El correo electrónico debe ser válido';
    return null;
  };

  const validatePassword = (password) => {
    if (!password) return 'La contraseña es obligatoria';
    if (!passwordRegex.test(password)) return 'La contraseña debe cumplir con los requisitos de seguridad';
    return null;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return 'Debe confirmar su contraseña';
    if (password && confirmPassword && password !== confirmPassword) return 'Las contraseñas no coinciden';
    if (!confirmPasswordRegex.test(confirmPassword)) return 'La contraseña de confirmación no es válida';
    return null;
  };

  const validateFields = () => {
    const validationErrors = {};

    // Validación de los campos
    validationErrors.name = validateName(name);
    validationErrors.firstSurname = validateSurname(firstSurname);
    validationErrors.secondSurname = validateSurname(secondSurname);
    validationErrors.idCard = validateIdCard(idCard);
    validationErrors.phoneNumber = validatePhoneNumber(phoneNumber);
    validationErrors.email = validateEmail(email);
    validationErrors.password = validatePassword(password);
    validationErrors.confirmPassword = validateConfirmPassword(password, confirmPassword);

    // Eliminar valores nulos de los errores
    for (const key in validationErrors) {
      if (validationErrors[key] === null) {
        delete validationErrors[key];
      }
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

    setIsLoading(true);  // Activar isLoading al enviar la solicitud
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
              <label htmlFor="phoneNumber" className="form-label">Número de Teléfono</label>
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
                <button type="button" onClick={togglePasswordVisibility} className="input-group-text">
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
                  placeholder="Confirme su contraseña"
                  required
                />
                <button type="button" onClick={toggleConfirmPasswordVisibility} className="input-group-text">
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? 'Registrando...' : 'Registrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
