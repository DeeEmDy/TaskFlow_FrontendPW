import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout as logoutService } from "../service/User/UserService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar si ya hay un token en sessionStorage al inicio
  const [token, setToken] = useState(() => sessionStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const protectedRoutes = ['/homePage', '/calendar', '/dashBoard'];

  // Efecto para redirigir si no hay token en rutas protegidas
  useEffect(() => {
    const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

    // Verifica si la ruta es protegida y si no hay token, redirige al login
    if (isProtectedRoute && !token) {
      navigate('/login', { replace: true });
    }
  }, [location, navigate, token]);

  // Función de login
  const login = (newToken) => {
    sessionStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  // Función de logout
  const logout = async () => {
    try {
      const response = await logoutService();

      if (response.success) {
        sessionStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
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
