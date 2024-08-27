import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App'; 
import Calendar from './pages/Calendar'; 
import HomePage from './pages/HomePage'; 
import Layout from './components/Layout'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta de App sin Sidebar */}
        <Route path="/" element={<App />} />

        {/* Ruta de HomePage con Sidebar envuelta en Layout */}
        <Route 
          path="/homePage" 
          element={
            <Layout>
              <HomePage />
            </Layout>
          } 
        />

        {/* Ruta de Calendar con Sidebar envuelta en Layout */}
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
