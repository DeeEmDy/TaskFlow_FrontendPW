import React, { useState, useEffect } from 'react'; // eslint-disable-line
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../redux/UserSlice';
import { useNavigate } from 'react-router-dom'; // Para redirección
import LoginForm from './LoginForm';

const AppContent = () => {
  const [componentToShow, setComponentToShow] = useState('login');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Selecciona el estado de autenticación desde Redux
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // Redirige a la página principal si el usuario está autenticado
    if (user) {
      navigate('/homePage'); // Si se realizo el login correctamente, redirige a la página de inicio
    } else if (componentToShow !== 'login') {
      // Redirige a la página de login si el usuario no está autenticado
      navigate('/'); // Si no se realizo el login correctamente, redirige al inicio.
    }
  }, [user, componentToShow, navigate]);

  const onLogin = async (e, email, password) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      console.log('Login exitoso:', result);
      setComponentToShow('messages');
    } catch (error) {
      console.error('Error durante el login:', error);
      setErrorMessage('Error durante el login: ' + (error.message || 'Error desconocido.'));
      setComponentToShow('welcome');
    }
  };
  
  const onRegister = async (e, name, firstSurname, secondSurname, idCard, phoneNumber, email, password, confirmPassword, userVerified, status) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }
    try {
      const result = await dispatch(register({ 
        name,  
        firstSurname,
        secondSurname,
        idCard,
        phoneNumber,
        id_image: null,
        id_rol: 2, // Asignar rol NORMUSER por defecto
        email,
        password,
        userVerified,
        status
      })).unwrap();
      console.log('Registro exitoso:', result);
      setComponentToShow('messages');
    } catch (error) {
      console.error('Error durante el registro:', error);
      setErrorMessage('Error durante el registro: ' + (error.message || 'Error desconocido.'));
    }
  };
  
  return (
    <div>
      {componentToShow === 'login' && (
        <LoginForm
          onLogin={onLogin}
          onRegister={onRegister}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage} 
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      )}
      {componentToShow === 'welcome' && <div>Welcome Content</div>}
      {componentToShow === 'messages' && <div>Messages Content</div>}
    </div>
  );
};

export default AppContent;
