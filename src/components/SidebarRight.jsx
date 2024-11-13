import { useState, useEffect, useRef } from "react";
import "../style/SidebarRight.css";
import { FaBell, FaBellSlash } from 'react-icons/fa'; // Importación de íconos

const SidebarRight = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tooltip, setTooltip] = useState(""); // Estado para manejar el texto del tooltip
  const sidebarRef = useRef(null);

  // Tareas con recordatorio
  const [tasks, setTasks] = useState([
    { id: 1, name: "Tarea 1", description: "Descripción de la tarea 1", createdDate: "2024-10-01", expirationDate: "2024-10-31", status: "pending", reminder: false },
    { id: 2, name: "Tarea 2", description: "Descripción de la tarea 2", createdDate: "2024-10-05", expirationDate: "2024-10-30", status: "completed", reminder: false },
    { id: 3, name: "Tarea 3", description: "Descripción de la tarea 3", createdDate: "2024-10-10", expirationDate: "2024-11-05", status: "incomplete", reminder: false },
    { id: 4, name: "Tarea 4", description: "Descripción de la tarea 4", createdDate: "2024-10-15", expirationDate: "2024-11-10", status: "pending", reminder: false }
  ]);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const openModal = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !selectedTask) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedTask]);

  const handleSidebarToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Cambiar estado de recordatorio
  const toggleReminder = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  // Comprobación de recordatorios
  useEffect(() => {
    const checkReminders = () => {
      const today = new Date();
      tasks.forEach((task) => {
        if (task.reminder) {
          const expirationDate = new Date(task.expirationDate);
          const diffInDays = (expirationDate - today) / (1000 * 60 * 60 * 24);
          if (diffInDays <= 2 && diffInDays > 1) {
            console.log(`Enviando recordatorio para la tarea: ${task.name}`);
            sendReminderEmail(task); // Llamada a función de envío de correo
          }
        }
      });
    };

    const intervalId = setInterval(checkReminders, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [tasks]);

  // Simulación de función para enviar correo de recordatorio
  const sendReminderEmail = (task) => {
    console.log(`Correo enviado al usuario para la tarea: ${task.name}, con vencimiento el: ${task.expirationDate}`);
    // Aquí podrías añadir una lógica para enviar el correo real usando un servicio de backend
  };

  // Cambiar el texto del tooltip según el estado del recordatorio
  const handleMouseEnterReminder = (reminderStatus) => {
    setTooltip(reminderStatus ? "Desactivar recordatorio" : "Activar recordatorio");
  };

  const handleMouseLeaveReminder = () => {
    setTooltip(""); // Limpiar el texto cuando el cursor ya no esté sobre el icono
  };

  return (
    <>
      <button className="sidebar-toggle-button" onClick={handleSidebarToggle} title="Tareas o Eventos">
        &#9776;
      </button>

      <div ref={sidebarRef} className={`sidebar-right ${isOpen ? "open" : ""}`}>
        <h2 className="text-lg font-bold mb-4">Tareas o Eventos</h2>

        {/* Sección de Tareas por Hacer */}
        <div>
          <button onClick={() => toggleSection("pending")} className="section-toggle">
            Tareas por Hacer <span>{activeSection === "pending" ? "▲" : "▼"}</span>
          </button>
          {activeSection === "pending" && (
            <ul className="ml-4 list-disc">
              {tasks.filter((task) => task.status === "pending").map((task) => (
                <li key={task.id} onClick={() => openModal(task)} className="task-item">
                  {task.name}
                  <span 
                    onClick={(e) => { e.stopPropagation(); toggleReminder(task.id); }} 
                    className="reminder-icon"
                    onMouseEnter={() => handleMouseEnterReminder(task.reminder)}
                    onMouseLeave={handleMouseLeaveReminder}
                    title={tooltip}
                  >
                    {task.reminder ? <FaBell /> : <FaBellSlash />}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sección de Tareas Completadas */}
        <div>
          <button onClick={() => toggleSection("completed")} className="section-toggle">
            Tareas Completadas <span>{activeSection === "completed" ? "▲" : "▼"}</span>
          </button>
          {activeSection === "completed" && (
            <ul className="ml-4 list-disc">
              {tasks.filter((task) => task.status === "completed").map((task) => (
                <li key={task.id} onClick={() => openModal(task)} className="task-item">
                  {task.name}
                  <span 
                    onClick={(e) => { e.stopPropagation(); toggleReminder(task.id); }} 
                    className="reminder-icon"
                    onMouseEnter={() => handleMouseEnterReminder(task.reminder)}
                    onMouseLeave={handleMouseLeaveReminder}
                    title={tooltip}
                  >
                    {task.reminder ? <FaBell /> : <FaBellSlash />}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sección de Tareas Incompletas */}
        <div>
          <button onClick={() => toggleSection("incomplete")} className="section-toggle">
            Tareas Incompletas <span>{activeSection === "incomplete" ? "▲" : "▼"}</span>
          </button>
          {activeSection === "incomplete" && (
            <ul className="ml-4 list-disc">
              {tasks.filter((task) => task.status === "incomplete").map((task) => (
                <li key={task.id} onClick={() => openModal(task)} className="task-item">
                  {task.name}
                  <span 
                    onClick={(e) => { e.stopPropagation(); toggleReminder(task.id); }} 
                    className="reminder-icon"
                    onMouseEnter={() => handleMouseEnterReminder(task.reminder)}
                    onMouseLeave={handleMouseLeaveReminder}
                    title={tooltip}
                  >
                    {task.reminder ? <FaBell /> : <FaBellSlash />}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal de Tarea */}
      {selectedTask && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">{selectedTask.name}</h3>
            <p><strong>Descripción:</strong> {selectedTask.description}</p>
            <p><strong>Fecha de Creación:</strong> {selectedTask.createdDate}</p>
            <p><strong>Fecha de Expiración:</strong> {selectedTask.expirationDate}</p>
            <button onClick={closeModal} className="close-button">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarRight;
