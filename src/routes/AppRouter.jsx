import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { useAuth } from '../context/AuthContext';

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Si el usuario está autenticado, renderiza las rutas privadas, de lo contrario redirige a /login */}
      <Route path="/" element={isAuthenticated ? <PrivateRoutes /> : <Navigate to="/login" />} />

      {/* Si el usuario está autenticado, renderiza las rutas privadas, de lo contrario renderiza las rutas públicas */}
      <Route path="/*" element={isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />} />
    </Routes>
  );
}