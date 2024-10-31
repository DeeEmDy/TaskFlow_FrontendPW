
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './components/App'; 
import Calendar from './pages/Calendar'; 
import HomePage from './pages/HomePage'; 
import Layout from './components/Layout';
import DashBoard from "./components/DashBoard";
import ForgotPassword from "./components/Forgot-password";

// Inicializamos el QueryClient
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Envolvemos la aplicación en QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
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

          {/* Ruta de DashBoard con Sidebar envuelta en Layout */}
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
    </QueryClientProvider>
  </React.StrictMode>
);




