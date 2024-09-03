import { useState, useEffect } from "react";
import "../style/Sidebar.css";
import eventoIcon from "../imagenes/Evento.png"; 
import calendarIcon from "../imagenes/calendar.png";
import dashboardIcon from "../imagenes/dashboard1.png";
import informacionIcon from "../imagenes/informacion.png";
import sesionIcon from "../imagenes/cerrar-sesion.png";
import perfilIcon from "../imagenes/perfil.png";
import bar1Icon from "../imagenes/bar1.png";
import inicioIcon from "../imagenes/casa.png";
import logrosIcon from "../imagenes/logros.png";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = (e) => {
    if (!e.target.closest('.sidebar') && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeSidebar);
    return () => {
      document.removeEventListener('click', closeSidebar);
    };
  }, [isOpen]);

  return (
    <div className={`containerside ${isOpen ? "sidebar-open" : ""}`}>
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="menu-btn" onClick={toggleSidebar}>
          <img src={bar1Icon} alt="Bar" style={{ width: '25px', height: '25px' }} />
        </div>
        <div className="head">
          <a href="#">
            <div className="user-img" title="Perfil">
              <img src={perfilIcon} alt="Perfil" style={{ width: '45px', height: '45px' }} />
            </div>
          </a>
          <div className="user-details">
            <p className="title">Task Flow</p>
            <p className="name">Dixon Gongora</p>
          </div>
        </div>
        <div className="nav">
          <div className="menu">
            <p className="title">Home</p>
            <ul>
            <li>
                <a href="/homePage" title="Inicio">
                  <img src={inicioIcon} alt="Inicio" style={{ width: '25px', height: '25px' }} />
                  <span className="text">Inicio</span>
                </a>
              </li>
              <li>
                <a href="/dashBoard" title="Dashboard">
                  <img src={dashboardIcon} alt="Dashboard" style={{ width: '28px', height: '28px' }} />
                  <span className="text">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/calendar" title="Calendario">
                  <img src={calendarIcon} alt="Calendar" style={{ width: '25px', height: '25px' }} />
                  <span className="text">Calendario</span>
                </a>
              </li>
              <li>
                <a href="#" title="Eventos">
                  <img src={eventoIcon} alt="Evento" style={{ width: '25px', height: '25px' }} />
                  <span className="text">Eventos</span>
                </a>
              </li>
              <li>
                <a href="#" title="Tus Logros">
                  <img src={logrosIcon} alt="Logros" style={{ width: '28px', height: '28px' }} />
                  <span className="text">Tus Logros</span>
                </a>
              </li>
            </ul>
          </div>
          
        </div>
        <div className="menu">
          <p className="title">Account</p>
          <ul>
            <li>
              <a href="#" title="Ayuda">
                <img src={informacionIcon} alt="Informacion" style={{ width: '28px', height: '28px' }} />
                <span className="text">Ayuda</span>
              </a>
            </li>
            <li>
              <a href="/" title="Cerrar Sesión">
                <img src={sesionIcon} alt="Cerrar-sesion" style={{ width: '25px', height: '25px' }} />
                <span className="text">Cerrar Sesión</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
