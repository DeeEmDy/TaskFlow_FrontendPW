import { useEffect, useState } from 'react';
import '../style/HomePage.css';

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Usamos useEffect para comprobar el token en sessionStorage al montar el componente
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsAuthenticated(!!token);  // Si hay token, el usuario está autenticado
  }, []);  // Solo se ejecuta una vez al montar el componente

  // Mientras no esté autenticado, mostramos un mensaje de carga
  if (!isAuthenticated) {
    return (
      <div className="homepage-container">
        <main className="main-content">
          <h1 className="main-title">Cargando...</h1>
          <p className="main-description">Verificando tu autenticación...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="homepage-container">
      {/* Contenido principal, solo visible si está autenticado */}
      <main className="main-content">
        <h1 className="main-title">Bienvenido a Task Flow</h1>
        <p className="main-description">Página principal</p>
      </main>
    </div>
  );
}

export default HomePage;
