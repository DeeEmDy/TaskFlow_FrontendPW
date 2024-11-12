import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import DashBoard from "../components/DashBoard";
import Calendar from "../pages/Calendar";
import HomePage from "../pages/HomePage";

const PrivateRoutes = () => {
  return (
    <Routes>
      {/* Envolvemos las rutas privadas dentro de Layout */}
      <Route element={<Layout />}>
        {/* Envolvemos cada ruta privada con ProtectedRoute */}
        <Route
          path="/homePage"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashBoard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        {/* Agrega otras rutas privadas según sea necesario */}
      </Route>

      {/* Ruta por defecto que redirige al dashboard si no se encuentra la ruta */}
      <Route path="*" element={<Navigate to="/homePage" replace />} />
    </Routes>
  );
};

export default PrivateRoutes;
