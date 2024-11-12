import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './routes/AppRouter';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 1. Creación del cliente de React Query
const queryClient = new QueryClient();

// Renderizado de la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter /> {/* Renderiza las rutas desde el archivo dedicado */}
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} /> {/* Herramienta para depuración de React Query */}
    </QueryClientProvider>
  </React.StrictMode>
);
