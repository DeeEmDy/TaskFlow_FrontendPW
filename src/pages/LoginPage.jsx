import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../service/Auth/LoginUser';
import '../style/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { emailRegex, passwordRegex } from '../assets/ExpresionesRegulares/ExpresionesRegularesValidacion';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.data.token);
      Swal.fire({
        title: 'Inicio de sesión exitoso',
        text: data.message || 'Inicio de sesión exitoso',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => {
        setEmail('');
        setPassword('');
        navigate('/homePage');
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error al iniciar sesión',
        text: error.error?.message || 'Error al iniciar sesión',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
      });

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
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmailFormField = (email) => {
    if (!email) return 'El email es obligatorio';
    if (!emailRegex.test(email)) return 'El formato del email no es válido';
    return null;
  };

  const validatePasswordFormField = (password) => {
    if (!password) return 'La contraseña es obligatoria';
    if (!passwordRegex.test(password)) return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
    return null;
  };

  const validateLoginFormFields = () => {
    const validationErrors = {};
    validationErrors.email = validateEmailFormField(email);
    validationErrors.password = validatePasswordFormField(password);
    for (const key in validationErrors) {
      if (validationErrors[key] === null) delete validationErrors[key];
    }
    return validationErrors;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationErrors = validateLoginFormFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const credentialsDto = { email, password };
    mutation.mutate(credentialsDto);
  };

  const redirectToForgotPassword = () => {
    navigate('/forgotPassword');
  };

  const redirectToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-sm p-6 shadow-lg rounded-lg bg-white">
        <div className="card-body">
          <h3 className="text-center text-2xl font-semibold">Inicio de Sesión</h3>
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
                className="absolute right-2 top-12 transform -translate-y-1/2 text-gray-600 text-xl"
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

            <button type="submit" className="btn btn-primary w-full py-2">
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

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
