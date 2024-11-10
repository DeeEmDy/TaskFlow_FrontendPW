import { Routes, Route } from "react-router-dom";

// Rutas
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

export default function AppRouter() {
  // Verifica si el usuario está autenticado al buscar el token en el sessionStorage
  const isAuth = !!sessionStorage.getItem("token"); // Obtén el token del sessionStorage, si está presente, el usuario está autenticado

  return (
    <Routes>
      {/* Si el usuario está autenticado, renderiza las rutas privadas */}
      {isAuth ? (
        <Route path="/*" element={<PrivateRoutes />} />
      ) : (
        // Si no está autenticado, renderiza las rutas públicas
        <Route path="/*" element={<PublicRoutes />} />
      )}
    </Routes>
  );
}
