import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 

//Children es el contenido que se renderizará si la condición de autenticación se cumple.
const ProtectedRoute = ({ children }) => { //recibe children, que representa el contenido (otros componentes) que se renderizará si la condición de autenticación se cumple.
  const token = localStorage.getItem('token'); //Obtiene el token del localStorage obtenido al iniciar sesión.

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
