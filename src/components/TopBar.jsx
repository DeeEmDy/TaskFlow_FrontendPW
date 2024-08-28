import { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import '../style/TopBar.css';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isModalOpen]);

  return (
    <div className="homepage-container">
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">Task Flow</div>
          <ul className="navbar-links">
            <li><a href="/homePage">Inicio</a></li>
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Servicios</a></li>
            <li><a href="#">Contacto</a></li>
            <li className="notification-icon" onClick={toggleModal}>
              <FaBell />
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal de notificaciones */}
      {isModalOpen && (
        <div className="notification-modal">
          <div className="notification-modal-content" ref={modalRef}>
            <button className="close-modal" onClick={toggleModal}>X</button>
            <h2>Notificaciones</h2>
            <p>Aquí se mostrarán tus notificaciones.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;




/*
prueba de iconos.

import { FaHome, FaCalendarAlt, FaSignOutAlt, FaCalendarCheck, FaTrophy } from 'react-icons/fa';
import '../style/TopBar.css';

function HomePage() {
  return (
    <div className="homepage-container">

      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">Task Flow</div>
          <ul className="navbar-links">
            <li><a href="/homePage"><FaHome /> Inicio</a></li>
            <li><a href="#"><FaCalendarAlt /> Calendario</a></li>
            <li><a href="#"><FaCalendarCheck /> Eventos</a></li>
            <li><a href="#"><FaTrophy /> Logros</a></li>
            <li><a href="#"><FaSignOutAlt /> Cierre de Sesión</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default HomePage;


*/ 