import React from 'react';
import LoginForm from './LoginForm';
import { request, setAuthToken } from '../axios_helper';

export default class AppContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentToShow: 'login', // Cambiar el estado inicial para probar el formulario de login
    };
  }

  login = () => {
    this.setState({ componentToShow: 'login' });
  };

  logout = () => {
    this.setState({ componentToShow: 'welcome' });
  };

  onLogin = (e, email, password) => {
    e.preventDefault();
    request('POST', '/login', { email, password })
      .then((response) => {
        setAuthToken(response.data.token); // Guardar el token en el local storage
        this.setState({ componentToShow: 'messages' });
      })
      .catch(() => {
        this.setState({ componentToShow: 'welcome' });
      });
  };

  onRegister = async (e, name, firstSurname, secondSurname, idCard, phoneNumber, idImage, idRrol, email, password, userVerified) => {
    e.preventDefault();
    try {
        const response = await request(
            "POST",
            "/register",
            { 
                name,  
                firstSurname,
                secondSurname,
                idCard,
                phoneNumber,
                idImage: null,
                idRrol: 2,
                email,
                password,
                userVerified: 0
            }
        );
        setAuthToken(response.data.token); // Guardar el token en el local storage
        this.setState({ componentToShow: "messages" });
    } catch (error) {
        console.error("Error during registration:", error);
        this.setState({ componentToShow: "welcome" });
    }
  };

  render() {
    const { componentToShow } = this.state;

    return (
      <div>
        {/* Botón para cambiar el estado a 'login' para probar el formulario */}
        <button onClick={this.login}>Mostrar Login</button>

        {componentToShow === 'login' && (
          <LoginForm
            onLogin={this.onLogin}
            onRegister={this.onRegister}
          />
        )}
        {/* Puedes agregar otros componentes aquí según el estado */}
        {componentToShow === 'welcome' && <div>Welcome Content</div>}
        {componentToShow === 'messages' && <div>Messages Content</div>}
      </div>
    );
  }
}
