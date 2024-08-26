import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import AppContent from './AppContent';

function App() {
    const navigate = useNavigate();

    const goToCalendar = () => {
        navigate('/calendar');
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <div className="container mx-auto p-4 flex-grow">
                <div className="flex justify-center">
                    <AppContent />
                </div>
                <div className="mt-3 flex justify-center">
                    <button 
                        onClick={goToCalendar} 
                        className="btn btn-primary py-2 px-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
                    >
                        Go to Calendar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
