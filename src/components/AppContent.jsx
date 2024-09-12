import React, { useState } from 'react'; //eslint-disable-line
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { login, register } from '../redux/UserSlice';

const AppContent = () => {
  const [componentToShow, setComponentToShow] = useState('login');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const onLogin = async (e, email, password) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      console.log('Login exitoso:', result); // Agrega esta línea
      setComponentToShow('messages');
    } catch (error) {
      console.error('Error durante el login:', error); // Agrega esta línea
      setErrorMessage('Error durante el login: ' + error.message);
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
        id_rol: null,
        email,
        password,
        userVerified,
        status
      })).unwrap();
      console.log('Registro exitoso:', result); // Agrega esta línea
      setComponentToShow('messages');
    } catch (error) {
      console.error('Error durante el registro:', error); // Agrega esta línea
      setErrorMessage('Error durante el registro: ' + error);
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
