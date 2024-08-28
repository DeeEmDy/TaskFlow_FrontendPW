import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import AppContent from './AppContent';

function App() {


    return (
        <div className="bg-white min-h-screen flex flex-col">
            <div className="container mx-auto p-4 flex-grow">
                <div className="flex justify-center">
                    <AppContent />
                </div>
            </div>
        </div>
    );
}

export default App;
