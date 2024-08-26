import { useState } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import Modal from 'react-modal';
import '../style/Calendar.css';
import { showAlert } from '../components/Alert.jsx';

Modal.setAppElement('#root');

function App() {
  const localizer = dayjsLocalizer(dayjs);
  const [events, setEvents] = useState([
    {
      start: dayjs('2024-08-08 12:00 AM', 'YYYY-MM-DD hh:mm A').toDate(),
      end: dayjs('2024-08-08 03:00 PM', 'YYYY-MM-DD hh:mm A').toDate(),
      title: "Evento de Ejemplo"
    }
  ]);

  const [, setSelectedSlot] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const users = [
    { id: '1', name: 'Usuario 1' },
    { id: '2', name: 'Usuario 2' },
    { id: '3', name: 'Usuario 3' },
  ];

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]);
    setModalIsOpen(false);
    showAlert('Evento agregado con éxito!');
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSlotClick}
        onSelectEvent={event => showAlert(event.title)}
        style={{ height: '81vh', width: '100%', margin: '0 auto', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      />

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="event-modal"  overlayClassName="modal-overlay">
        <h2 className="modal-title">Agregar Nuevo Evento</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Fecha Tarea Creada:</label>
            <input
              type="datetime-local"
              name="created_task_date"
              value={dayjs(newEvent.created_task_date).format('YYYY-MM-DDTHH:mm')}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Fecha de Tarea Expirada:</label>
            <input
              type="datetime-local"
              name="expiration_task_date"
              value={dayjs(newEvent.expiration_task_date).format('YYYY-MM-DDTHH:mm')}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="description_task"
              value={newEvent.description_task}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Usuario:</label>
            <select
              name="id_user"
              value={newEvent.id_user}
              onChange={handleInputChange}
              required
              className="form-input"
            >
              <option value="">Seleccione un usuario</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
  
          <div className="form-group">
            <label>Progreso de Tarea (%):</label>
            <input
              type="range"
              name="progress_task"
              value={newEvent.progress_task || 0}
              onChange={handleInputChange}
              min="0"
              max="100"
              required
              className="form-input"
              disabled
            />
            <div>{newEvent.progress_task || 0}%</div>
          </div>
        
          <div className="form-group">
            <label>Fecha Finalización de Tarea:</label>
            <input
              type="date"
              name="finalization_task_date"
              value={newEvent.finalization_task_date}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Puntaje:</label>
            <input
              type="number"
              name="score"
              value={newEvent.score}
              onChange={handleInputChange}
              min="0"
              max="100"
              disabled
              className="form-input"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">Agregar Evento</button>
            <button type="button" onClick={() => setModalIsOpen(false)} className="cancel-button">Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;