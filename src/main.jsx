import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Importa BrowserRouter y Routes
import App from './components/App'; // Ajusta la ruta a tu archivo App.jsx
import Calendar from './pages/Calendar'; // Ajusta la ruta a tu archivo Calendar.jsx

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Envuelve tu aplicación con BrowserRouter */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
