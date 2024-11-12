import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

export default function AppRouter() {
  const isAuth = !!sessionStorage.getItem("token"); // Verifica si hay un token en sessionStorage

  return (
    <Routes>
      {/* Si el usuario está autenticado, renderiza las rutas privadas */}
      <Route path="/" element={isAuth ? <PrivateRoutes /> : <Navigate to="/login" />} />
      {/* Si no está autenticado, renderiza las rutas públicas */}
      <Route path="/*" element={isAuth ? <PrivateRoutes /> : <PublicRoutes />} />
    </Routes>
  );
}
