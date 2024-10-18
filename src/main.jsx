import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App'; 
import Calendar from './pages/Calendar'; 
import HomePage from './pages/HomePage'; 
import Layout from './components/Layout';
import DashBoard from "./components/DashBoard";
import ForgotPassword from "./components/Forgot-password";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta de App sin Sidebar */}
        <Route path="/" element={<App />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

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

        {/* Ruta de Calendar con Sidebar envuelta en Layout */}
        <Route 
          path="/dashBoard" 
          element={
            <Layout>
              <DashBoard />
            </Layout>
          } 
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
