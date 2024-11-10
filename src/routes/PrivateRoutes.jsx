import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute"; // Componente que protegerá las rutas privadas
import Layout from "../components/Layout"; // Importa el Layout que contiene Sidebar, TopBar, SidebarRight
import DashBoard from "../components/DashBoard"; // Componente de ejemplo para rutas privadas
import Calendar from "../pages/Calendar"; // Componente de ejemplo para rutas privadas
import HomePage from "../pages/HomePage"; // Componente de ejemplo para rutas privadas

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
