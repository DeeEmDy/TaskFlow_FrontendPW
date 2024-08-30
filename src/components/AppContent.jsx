import React from 'react';
import WelcomeContent from './WelcomeContent';
import AuthContent from './AuthContent';
import LoginForm from './LoginForm';

import { request, setAuthToken } from '../axios_helper';

export default class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "welcome",
        };
    };

    
    login = () => {
        this.setState({ componentToShow: "login" });
    };

    logout = () => {
        this.setState({ componentToShow: "welcome" });
    };

    onLogin = (e, email, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            { email: email, password: password }
        ).then((response) => {
            this.setState({ componentToShow: "messages" });
            setAuthToken(response.data.token); // Guardar el token en el local storage
        }).catch((error) => {
            this.setState({ componentToShow: "welcome" });
        });
    };

    onRegister = (e, name, first_surname, second_surname, id_card, phone_number, id_image, id_rol, email, password, user_verified) => {
        e.preventDefault();
        request(
            "POST",
            "/register",
            { 
                name: name,  
                first_surname: first_surname,
                second_surname: second_surname,
                id_card: id_card,
                phone_number: phone_number,
                id_image: null,
                id_rol: 2, // 2 es el id del rol de usuario normal.
                email: email,
                password: password,
                user_verified: 0 // 0 es el valor por defecto de la verificación del usuario se encuentra inactivo o en 0, hasta que el usuario presione el link del correo electronico de activación de su cuenta.
            }
        ).then((response) => {
            this.setState({ componentToShow: "messages" });
            setAuthToken(response.data.token); // Guardar el token en el local storage
        }).catch((error) => {
            this.setState({ componentToShow: "welcome" });
        });
    };
    

    render() {
        return (
            <div>
                {/* Componente de autenticación */}
                {/* <AuthContent /> /}  {/ EL QUE CONTIENE EL MENSAJE RECIBIDO DEL BACKEND. */}
                {/* Componente del formulario de inicio de sesión */}
                <LoginForm />
            </div>
        );
    }
    
}