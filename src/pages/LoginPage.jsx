import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../service/Auth/LoginUser';
import '../style/LoginForm.css';
import { useNavigate } from 'react-router-dom';  // Usamos el hook useNavigate para redirigir
import { emailRegex, passwordRegex } from '../assets/ExpresionesRegulares/ExpresionesRegularesValidacion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);  // Para manejar el estado de carga

  const navigate = useNavigate(); // Usamos el hook useNavigate para redirigir

  //Crear la mutación para el inicio de sesión.
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      Swal.fire({
        title: 'Inicio de sesión exitoso',
        text: data.message || 'Inicio de sesión exitoso',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => {
        //Limpiar los campos del formulario del login.
        setEmail('');
        setPassword('');

        //Redirigir a la HomePage.
        navigate('/homePage');
      });
    },
    onError: (error) => {
      //Mostrar un mensaje de error.
      Swal.fire({
        title: 'Error al iniciar sesión',
        text: error.error?.message || 'Error al iniciar sesión',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
      });

      // Si hay errores de validación, mostrarlos en consola y actualizamos el estado de los errores.
      if (error.error?.errors?.length > 0) {
        console.log('Errores de validación:', error.error.errors);
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
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Función para validar el formulario de inicio de sesión.
  const validateEmailFormField = (email) => {
    if (!email) return 'El email es obligatorio';
    if (!emailRegex.test(email)) return 'El formato del email no es válido';
    return null;
  };

  // Función para validar el campo de contraseña del inicio de sesión.
  const validatePasswordFormField = (password) => {
    if (!password) return 'La contraseña es obligatoria';
    if (!passwordRegex.test(password)) return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
    return null;
  };


  //Función para validar los campos del formulario de inicio de sesión.
  const validateLoginFormFields = () => {
    const validationErrors = {};

    //Validación de los campos del formulario.
    validationErrors.email = validateEmailFormField(email);
    validationErrors.password = validatePasswordFormField(password);

    //Eliminar valores nulos o indefinidos de los errores de validación.
    for (const key in validationErrors) {
      if (validationErrors[key] === null) {
        delete validationErrors[key];
      }
    }

    return validationErrors;
  };


  // Función para manejar el envío del formulario.
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // Iniciar el spinner al hacer submit

    // Validar los campos del formulario.
    const validationErrors = validateLoginFormFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    //Enviar el formulario de inicio de sesión en un credentialsDto.

    const credentialsDto = {
      email,
      password,
    };

    //Llamar a la mutación de inicio de sesión.
    setIsLoading(true);  // Activar isLoading al enviar la solicitud
    mutation.mutate(credentialsDto);
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
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
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

            <div className="mb-3">
              <button type="button" onClick={redirectToForgotPassword} className="forgot-password-link">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Agregar el enlace de redirección a la página de registro con el mismo estilo que "Olvidaste tu contraseña" */}
          <div className="text-center mt-3">
            <button type="button" onClick={redirectToRegister} className="forgot-password-link">
              ¿No estás registrado? Regístrate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
