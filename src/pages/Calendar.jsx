// src/pages/Calendar.jsx
import React, { useState } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import Modal from 'react-modal';
import { showAlert } from '../components/Alert.jsx';

Modal.setAppElement('#root');

const CalendarApp = () => {
  // Configuración del localizador de fechas
  const localizer = dayjsLocalizer(dayjs);
  // Estado para almacenar eventos
  const [events, setEvents] = useState([
    {
      start: dayjs('2024-08-08 12:00 AM', 'YYYY-MM-DD hh:mm A').toDate(),
      end: dayjs('2024-08-08 03:00 PM', 'YYYY-MM-DD hh:mm A').toDate(),
      title: "Evento de Ejemplo"
    }
  ]);
  // Estado para la selección de un slot
  const [, setSelectedSlot] = useState(null);
  // Estado para el modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Estado para el nuevo evento
  const [newEvent, setNewEvent] = useState({
    id_user: '',
    title: '',
    description_task: '',
    created_task_date: '',
    expiration_task_date: '',
    progress_task: '',
    finalization_task_date: '',
    score: ''
  });

  // Lista de usuarios de ejemplo
  const users = [
    { id: '1', name: 'Usuario 1' },
    { id: '2', name: 'Usuario 2' },
    { id: '3', name: 'Usuario 3' },
  ];

  // Maneja el clic en un slot del calendario
  const handleSlotClick = (slotInfo) => {
    if (slotInfo.view === Views.MONTH) return; 
    setSelectedSlot(slotInfo);
    setModalIsOpen(true);
    setNewEvent({
      ...newEvent,
      created_task_date: slotInfo.start,
      expiration_task_date: slotInfo.start
    });
  };

  // Maneja el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]);
    setModalIsOpen(false);
    showAlert('Evento agregado con éxito!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSlotClick}
        onSelectEvent={event => showAlert(event.title)}
        style={{ height: '81vh' }}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 w-full max-w-md rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Agregar Nuevo Evento</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Formulario para agregar un evento */}
        </form>
      </Modal>
    </div>
  );
};

export default CalendarApp;
