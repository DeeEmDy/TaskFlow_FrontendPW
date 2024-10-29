import { useState, useEffect, useRef } from "react";
import "../style/SidebarRight.css";

const SidebarRight = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const sidebarRef = useRef(null);

  const tasks = [
    { id: 1, name: "Tarea 1", description: "Descripción de la tarea 1", createdDate: "2024-10-01", expirationDate: "2024-10-31", status: "pending" },
    { id: 2, name: "Tarea 2", description: "Descripción de la tarea 2", createdDate: "2024-10-05", expirationDate: "2024-10-30", status: "completed" },
    { id: 3, name: "Tarea 3", description: "Descripción de la tarea 3", createdDate: "2024-10-10", expirationDate: "2024-11-05", status: "incomplete" },
    { id: 4, name: "Tarea 4", description: "Descripción de la tarea 4", createdDate: "2024-10-15", expirationDate: "2024-11-10", status: "pending" }
  ];

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

  return (
    <>
      {/* Botón para abrir y cerrar el Sidebar */}
      <button className="sidebar-toggle-button" onClick={handleSidebarToggle} title="Tareas o Eventos">
        &#9776;
      </button>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar-right ${isOpen ? "open" : ""}`}>
        <h2 className="text-lg font-bold mb-4">Tareas o Eventos</h2>

        <div>
          <button onClick={() => toggleSection("pending")} className="section-toggle">
            Tareas por Hacer <span>{activeSection === "pending" ? "▲" : "▼"}</span>
          </button>
          {activeSection === "pending" && (
            <ul className="ml-4 list-disc">
              {tasks.filter((task) => task.status === "pending").map((task) => (
                <li key={task.id} onClick={() => openModal(task)} className="task-item">
                  {task.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <button onClick={() => toggleSection("completed")} className="section-toggle">
            Tareas Completadas <span>{activeSection === "completed" ? "▲" : "▼"}</span>
          </button>
          {activeSection === "completed" && (
            <ul className="ml-4 list-disc">
              {tasks.filter((task) => task.status === "completed").map((task) => (
                <li key={task.id} onClick={() => openModal(task)} className="task-item">
                  {task.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <button onClick={() => toggleSection("incomplete")} className="section-toggle">
            Tareas Incompletas <span>{activeSection === "incomplete" ? "▲" : "▼"}</span>
          </button>
          {activeSection === "incomplete" && (
            <ul className="ml-4 list-disc">
              {tasks.filter((task) => task.status === "incomplete").map((task) => (
                <li key={task.id} onClick={() => openModal(task)} className="task-item">
                  {task.name}
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
