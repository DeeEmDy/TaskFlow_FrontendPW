import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPassword from "../components/Forgot-password";

const PublicRoutes = () => {
  return (
    <Routes>
      {/* Redirige la ruta raíz a Login */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Otras rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      {/* Agrega otras rutas públicas que sean necesarias */}
    </Routes>
  );
};

export default PublicRoutes;
