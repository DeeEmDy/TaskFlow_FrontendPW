import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { useState, useEffect } from "react";

export default function AppRouter() {
  const [isAuth, setIsAuth] = useState(false);
  
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    setIsAuth(!!token);
  }, [token]); 

  return (
    <Routes>
      <Route path="/" element={isAuth ? <PrivateRoutes /> : <Navigate to="/login" />} />
      <Route path="/*" element={isAuth ? <PrivateRoutes /> : <PublicRoutes />} />
    </Routes>
  );
}
