import { Route, Routes, Navigate } from "react-router-dom"; 
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import DashBoard from "../components/DashBoard";
import Calendar from "../pages/Calendar";
import HomePage from "../pages/HomePage";
import { useAuth } from '../context/AuthContext';


const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated desde el private routes", isAuthenticated);
  return (
    <Routes>
      {/* Ruta principal que envuelve a todas las rutas privadas */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Navigate to="/homePage" replace />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/dashBoard" element={<DashBoard />} />
        {/* Otras rutas privadas aquí */}
      </Route>

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/homePage" replace />} />
    </Routes>
  );
};

export default PrivateRoutes;