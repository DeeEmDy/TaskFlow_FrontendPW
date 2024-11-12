import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Obtener el token del sessionStorage
    setIsAuthenticated(!!token);  // Actualiza el estado según la existencia del token
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );  // Mostrar el spinner mientras se determina la autenticación
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;  // Redirige a /login si no está autenticado
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
