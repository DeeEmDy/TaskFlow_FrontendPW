import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App'; // Ajusta la ruta a tu archivo App.jsx
import Calendar from './pages/Calendar'; // Ajusta la ruta a tu archivo Calendar.jsx
import Layout from './components/Layout'; // Ajusta la ruta a tu archivo Layout.jsx

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta sin Sidebar */}
        <Route path="/" element={<App />} />

        {/* Ruta con Sidebar envuelta en Layout */}
        <Route 
          path="/calendar" 
          element={
            <Layout>
              <Calendar />
            </Layout>
          } 
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
