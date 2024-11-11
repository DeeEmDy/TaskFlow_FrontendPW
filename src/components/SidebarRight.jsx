

import { useState, useEffect, useRef } from "react";
import { useTasks } from "../hooks/useTask"; // Importamos el hook

import "../style/SidebarRight.css";

const SidebarRight = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const sidebarRef = useRef(null);

  const { data: tasks = [], isLoading, error } = useTasks(); // Usamos el hook para obtener las tareas

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

  if (isLoading) return <div>Cargando tareas...</div>;
  if (error) return <div>Error al cargar las tareas</div>;

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
          <button onClick={() => toggleSection("Pendiente")} className="section-toggle">
            Tareas por Hacer <span>{activeSection === "pending" ? "▲" : "▼"}</span>
          </button>
          {activeSection === "Pendiente" && (
            <ul className="ml-4 list-disc">
              {tasks.filter((task) => task.progress_task === "Pendiente").map((task) => (
                <li key={task.id} onClick={() => openModal(task)} className="task-item">
                  {task.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <button onClick={() => toggleSection("Finalizada")} className="section-toggle">
            Tareas Completadas <span>{activeSection === "Finalizada" ? "▲" : "▼"}</span>
          </button>
          {activeSection === "Finalizada" && (
            <ul className="ml-4 list-disc">
              {tasks.filter((task) => task.progress_task === "Finalizada").map((task) => (
                <li key={task.id} onClick={() => openModal(task)} className="task-item">
                  {task.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <button onClick={() => toggleSection("Incompleta")} className="section-toggle">
            Tareas Incompletas <span>{activeSection === "Incompleta" ? "▲" : "▼"}</span>
          </button>
          {activeSection === "Incompleta" && (
            <ul className="ml-4 list-disc">
              {tasks.filter((task) => task.progress_task === "Incompleta").map((task) => (
                <li key={task.id} onClick={() => openModal(task)} className="task-item">
                  {task.title}
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


