import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import DashBoard from '../components/DashBoard';
import Calendar from '../pages/Calendar';
import HomePage from '../pages/HomePage';

const PrivateRoutes = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/dashBoard" element={<DashBoard />} />
          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/homePage" replace />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
};

export default PrivateRoutes;
