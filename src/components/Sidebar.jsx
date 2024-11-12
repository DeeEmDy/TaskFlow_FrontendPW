import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import "../style/Sidebar.css";
import eventoIcon from "../imagenes/Evento.png"; 
import calendarIcon from "../imagenes/calendar.png";
import dashboardIcon from "../imagenes/dashboard1.png";
import perfilIcon from "../imagenes/perfil.png";
import bar1Icon from "../imagenes/bar1.png";
import inicioIcon from "../imagenes/casa.png";
import logrosIcon from "../imagenes/logros.png";
import { FaSignOutAlt } from 'react-icons/fa';
import { FaCamera, FaTrashAlt } from 'react-icons/fa';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(perfilIcon);
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newLastName2, setNewLastName2] = useState("");
  const [newCedula, setNewCedula] = useState("");
  const [newTelefono, setNewTelefono] = useState("");
  const [newEmail, setNewEmail] = useState("");
  
  const navigate = useNavigate(); // Hook para redirigir

  // Obtener información del usuario desde sessionStorage
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user')); // Obtener el objeto usuario desde sessionStorage
    if (user) {
      setNewName(user.name);
      setNewLastName(user.firstSurname);
      setNewLastName2(user.secondSurname);
      setNewCedula(user.idCard);
      setNewTelefono(user.phoneNumber);
      setNewEmail(user.email);
      if (user.idImage?.imageContent) {
        setProfilePic(user.idImage.imageContent); // Si tiene foto de perfil
      }
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsDropdownOpen(false); // Cierra el dropdown
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false); // Cierra el dropdown
  };

  const closeModal = () => {
    setIsModalOpen(false);
    
  };

  
  const closeSidebar = (e) => {
    if (!e.target.closest('.sidebar') && isOpen) {
      setIsOpen(false);
    }
  };

   // Funciones para redirigir a diferentes rutas
   const handleProgresoTareas = () => {
    navigate("/dashBoard"); 
    setIsDropdownOpen(false); 
  };

  const handleOtros = () => {
    navigate("/otros");
    setIsDropdownOpen(false); 
  };

  const handleCerrarSesion = () => {
    navigate("/"); 
    setIsDropdownOpen(false); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePic = () => {
    setProfilePic(perfilIcon);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     
    closeModal();
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

        {/* Perfil con Dropdown */}
        <div className="relative">
          <div className="head" onClick={toggleDropdown}>
            <div className="user-img" title="Perfil">
              <img src={profilePic} alt="Perfil" style={{ width: '45px', height: '45px' }} />
            </div>
            <div className="user-details">
              <p className="title">Task Flow</p>
              <a href="#">{newName} {newLastName} {newLastName2}</a>
            </div>
          </div>
        
             <div className={`profile-dropdown ${isDropdownOpen ? 'open' : ''}`}>
              <ul>
                <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={openModal}>Perfil</li>
                <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={handleProgresoTareas}>Progreso de tareas</li>
                <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={handleOtros}>Otros</li>
                <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={handleCerrarSesion}>Cerrar Sesión</li>
              </ul>
            </div>
        
        </div>

        {/* Otras opciones */}
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
            <a href="/" title="Cerrar Sesión">
            <FaSignOutAlt style={{ width: '30px', height: '28px' }} /> 
            <span className="text">Cerrar Sesión</span>
            </a>
            </li>
          </ul>
        </div>

        {/* Modal para editar el perfil */}
        {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="modal-container bg-white p-6 rounded shadow-lg w-96">
            <div className="mb-4">
              <label className="block text-gray-700">Foto de perfil:</label>
              <div className="flex items-center space-x-4">
                <img
                  src={profilePic}
                  alt="Foto de perfil"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <label className="text-blue-500 cursor-pointer flex items-center">
                    <FaCamera className="mr-2" />
                    Cambiar
                    <input type="file" onChange={handleFileChange} className="hidden" />
                  </label>
                  <button
                    type="button"
                    onClick={removeProfilePic}
                    className="text-red-500 flex items-center mt-2"
                  >
                    <FaTrashAlt className="mr-2" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
            <br />
            <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre:</label>
                <input
                  type="text"
                  disabled
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Primer Apellido:</label>
                <input
                  type="text"
                  disabled
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Segundo Apellido:</label>
                <input
                  type="text"
                  disabled
                  value={newLastName2}
                  onChange={(e) => setNewLastName2(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Cedula:</label>
                <input
                  type="text"
                  disabled
                  value={newCedula}
                  onChange={(e) => setNewCedula(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Numero Telefono</label>
                <input
                  type="text"
                  value={newTelefono}
                  onChange={(e) => setNewTelefono(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Correo electrónico:</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Sidebar;
