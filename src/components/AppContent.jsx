import React, { useState } from 'react'; //eslint-disable-line
import LoginForm from './LoginForm';
import { request, setAuthToken } from '../axios_helper';

const AppContent = () => {
  const [componentToShow, setComponentToShow] = useState('login');

  const login = () => setComponentToShow('login');
  const logout = () => setComponentToShow('welcome');

  const onLogin = (e, email, password) => {
    e.preventDefault();
    request('POST', '/login', { email, password })
      .then((response) => {
        setAuthToken(response.data.token); // Guardar el token en el local storage
        setComponentToShow('messages');
      })
      .catch(() => {
        setComponentToShow('welcome');
      });
  };

  const onRegister = async (e, name, firstSurname, secondSurname, idCard, phoneNumber, email, password, userVerified, status) => {
    e.preventDefault();
    try {
      const response = await request('POST', '/register', { 
        name,  
        firstSurname,
        secondSurname,
        idCard,
        phoneNumber,
        id_image: null,
        id_rol: null, // Temporalmente se envía null, ya que no se ha implementado la funcionalidad de roles.
        email,
        password,
        userVerified: false,
        status: true // Indicando que el usuario está activo por defecto al registrarse.
      });
      setAuthToken(response.data.token); // Guardar el token en el local storage
      setComponentToShow('messages');
    } catch (error) {
      console.error("Error during registration:", error);
      setComponentToShow('welcome');
    }
  };

  return (
    <div>
      {componentToShow === 'login' && (
        <LoginForm
          onLogin={onLogin}
          onRegister={onRegister}
        />
      )}
      {componentToShow === 'welcome' && <div>Welcome Content</div>}
      {componentToShow === 'messages' && <div>Messages Content</div>}
    </div>
  );
};

export default AppContent;
