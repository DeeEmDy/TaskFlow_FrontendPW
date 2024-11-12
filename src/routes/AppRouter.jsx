import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { useAuth } from '../context/AuthContext';

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <PrivateRoutes /> : <Navigate to="/login" />} />
      <Route path="/*" element={isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />} />
    </Routes>
  );
}
