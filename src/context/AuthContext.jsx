import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const navigate = useNavigate();
  const location = useLocation();

  // Efecto para verificar autenticación en cambios de ruta
  useEffect(() => {
    const currentToken = sessionStorage.getItem('token');
    
    // Lista de rutas protegidas
    const protectedRoutes = ['/homePage', '/calendar', '/dashBoard'];
    
    // Verifica si la ruta actual está protegida
    const isProtectedRoute = protectedRoutes.some(route => 
      location.pathname.startsWith(route)
    );

    // Si es una ruta protegida y no hay token, redirige al login
    if (isProtectedRoute && !currentToken) {
      navigate('/login', { replace: true });
    }
  }, [location, navigate]);

  // Efecto para sincronizar el estado con sessionStorage
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken && !token) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else if (!storedToken && token) {
      setToken(null);
      setIsAuthenticated(false);
    }
  }, [token]);

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