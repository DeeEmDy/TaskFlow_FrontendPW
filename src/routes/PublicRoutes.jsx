import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPassword from "../components/Forgot-password";

const PublicRoutes = () => {
  // Función para manejar el login
  const handleLogin = (e, email, password) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", email, password);
    // Aquí puedes añadir la lógica de autenticación, como una llamada a la API
  };

  // Función para manejar el registro
  const handleRegister = async (signUpDto) => {
    try {
      console.log("Registrando usuario con:", signUpDto);
      return { success: true, message: 'Usuario registrado correctamente' };
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      return { success: false, error: { message: "Error al registrar usuario" } };
    }
  };

  // Función para manejar la recuperación de contraseña
  const handleForgotPassword = (email) => {
    console.log('Recuperación de contraseña para: ', email);
    // Aquí puedes agregar la lógica de recuperación de la contraseña, como hacer una llamada a la API
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
      {/* Pasa la función handleForgotPassword como prop */}
      <Route path="/forgotPassword" element={<ForgotPassword onForgotPassword={handleForgotPassword} />} />
    </Routes>
  );
};

export default PublicRoutes;
