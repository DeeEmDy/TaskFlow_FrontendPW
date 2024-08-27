import React from 'react';
import WelcomeContent from './WelcomeContent';
import AuthContent from './AuthContent';
import LoginForm from './LoginForm';

import { request } from '../axios_helper';

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

    onLogin = (e, username, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            { login: username, password: password }
        ).then((response) => {
            this.setState({ componentToShow: "messages" });
        }).catch((error) => {
            this.setState({ componentToShow: "welcome" });
        });
    };

    onRegister = (e, username, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            { login: username, password: password }
        ).then((response) => {
            this.setState({ componentToShow: "messages" });
        }).catch((error) => {
            this.setState({ componentToShow: "welcome" });
        });
    };
    

    render() {
        return (
            <div>
                <WelcomeContent />
                <AuthContent />
                <LoginForm />
            </div>
        )
    }
}