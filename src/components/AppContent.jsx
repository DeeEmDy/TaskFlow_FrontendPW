import React from 'react';
import WelcomeContent from './WelcomeContent';
import AuthContent from './AuthContent';
import LoginForm from './LoginForm';

const AppContent = () => {
    return (
        <div>
            <WelcomeContent />
            <AuthContent />
            <LoginForm />
        </div>
    );
}

export default AppContent;
