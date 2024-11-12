import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const navigate = useNavigate();
  const location = useLocation();

  // Lista de rutas protegidas
  const protectedRoutes = ['/homePage', '/calendar', '/dashBoard'];

  // Efecto para verificar si el token está en sessionStorage y sincronizarlo con el estado
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken !== token) {
      setToken(storedToken);
      setIsAuthenticated(!!storedToken);
    }
  }, [token]);

  // Efecto para redirigir si no hay token en rutas protegidas
  useEffect(() => {
    const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

    // Si es una ruta protegida y no hay token, redirige al login
    if (isProtectedRoute && !token) {
      navigate('/login', { replace: true });
    }
  }, [location, navigate, token]);

  const login = (newToken) => {
    sessionStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      isAuthenticated, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
