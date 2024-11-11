import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './components/App';
import Calendar from './pages/Calendar';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import DashBoard from './components/DashBoard';
import ForgotPassword from './components/Forgot-password';
import ProtectedRoute from './components/ProtectedRoute'; // Importa el ProtectedRoute

// 1. Creación del cliente de React Query
const queryClient = new QueryClient();

// Renderizado de la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Ruta de App sin Sidebar */}
          <Route path="/" element={<App />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />

          {/* Ruta de HomePage con Sidebar envuelta en ProtectedRoute */}
          <Route 
            path="/homePage" 
            element={
              <ProtectedRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </ProtectedRoute>
            } 
          />

          {/* Ruta de Calendar con Sidebar envuelta en ProtectedRoute */}
          <Route 
            path="/calendar" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Calendar />
                </Layout>
              </ProtectedRoute>
            } 
          />

          {/* Ruta de DashBoard con Sidebar envuelta en ProtectedRoute */}
          <Route 
            path="/dashBoard" 
            element={
              <ProtectedRoute>
                <Layout>
                  <DashBoard />
                </Layout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} /> {/* Herramienta para depuración */}
    </QueryClientProvider>
  </React.StrictMode>
);
