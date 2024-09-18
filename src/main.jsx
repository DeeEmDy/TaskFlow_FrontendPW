import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App'; 
import Calendar from './pages/Calendar'; 
import HomePage from './pages/HomePage'; 
import Layout from './components/Layout'; 
import NotFound from './pages/NotFound'; // Nueva importación para la página 404
import { Provider } from 'react-redux';
import store from './redux/Store'; // Ajustar la ruta de importación

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
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

          {/* Ruta de error 404 */}
          <Route path="*" element={<NotFound />} /> {/* Ruta comodín para páginas no encontradas */}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
