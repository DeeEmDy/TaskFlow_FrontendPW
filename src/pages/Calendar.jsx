import { useState } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import Modal from 'react-modal';
import '../assets/SweetAlert/SweetAlert.js'
import '../style/Calendar.css';
import { SweetAlertAccept } from '../assets/SweetAlert/SweetAlert.js';
import { showAlert } from '../assets/SweetAlert/SweetAlert.js';
import {
  textRegex,
  textRegexDescri,
} from '../assets/ExpresionesRegulares/ExpresionesRegularesValidacion.js'; // Importar las regex desde el archivo de validaciones

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
  const [errors, setErrors] = useState({});

  const users = [
    { id: '1', name: 'Dylan Arias Durán' },
    { id: '2', name: 'Dixon Góngora Muñoz' },
    { id: '3', name: 'Sofia Camacho Alcocer' },
    { id: '4', name: 'Derek Arias Durán' },
  ];

  const tasks = [
    { id: '1', name: 'Pendiente' },
    { id: '2', name: 'Haciendo' },
    { id: '3', name: 'Finalizada' },
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
  const validateField = (name, value) => {
    let errorMsg = '';
    switch (name) {
      case 'title':
        if (value.length === 0) {
          errorMsg = 'Este campo no puede estar vacío.';
        } else if (!textRegex.test(value)) {
          errorMsg = 'Contiene caracteres especiales no permitidos.';
        } else if (value.length < 6) {
          errorMsg = 'Debe tener al menos 6 caracteres.';
        } else if (value.length > 40) {
          errorMsg = 'No puede tener más de 40 caracteres.';
        }
        break;
        case 'description_task':
          if (value.length === 0) {
            errorMsg = 'Este campo no puede estar vacío.';
          } else if (!textRegexDescri.test(value)) {
            errorMsg = 'Contiene caracteres especiales no permitidos.';
          } else if (value.length < 6) {
            errorMsg = 'Debe tener al menos 6 caracteres.';
          } else if (value.length > 230) {
            errorMsg = 'No puede tener más de 230 caracteres.';
          }
          break;
      case 'created_task_date':
      case 'expiration_task_date':
      case 'finalization_task_date':
        if (dayjs(value).isBefore(dayjs(), 'day')) {
          errorMsg = 'No se permiten fechas anteriores a la fecha actual.';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMsg
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    // Validar todo el formulario antes de enviarlo
    Object.keys(newEvent).forEach(field => {
      validateField(field, newEvent[field]);
    });

    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      showAlert('Por favor corrige los errores antes de enviar el formulario.');
      return;
    }

    setEvents([...events, newEvent]);
    setModalIsOpen(false);
    SweetAlertAccept('Evento agregado con éxito!');
  };

  const getInputClassName = (fieldName) => {
    if (errors[fieldName]) {
      return 'form-input input-error';  
    } else if (newEvent[fieldName] && !errors[fieldName]) {
      return 'form-input input-valid';  
    } else {
      return 'form-input';  
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSlotClick}
        onSelectEvent={event => SweetAlertAccept(event.title)}
        style={{ height: '81vh', width: '100%', margin: '0 auto', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      />

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="event-modal" overlayClassName="modal-overlay">
        <h2 className="modal-title">Agregar Nuevo Evento</h2>
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

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
              className={getInputClassName('title')}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label>Fecha de creación:</label>
            <input
              type="datetime-local"
              name="created_task_date"
              value={dayjs(newEvent.created_task_date).format('YYYY-MM-DDTHH:mm')}
              onChange={handleInputChange}
              required
              className={getInputClassName('created_task_date')}
            />
            {errors.created_task_date && <span className="error-message">{errors.created_task_date}</span>}
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="description_task"
              value={newEvent.description_task}
              onChange={handleInputChange}
              className={getInputClassName('description_task')}
            />
            {errors.description_task && <span className="error-message">{errors.description_task}</span>}
          </div>

          <div className="form-group">
            <label>Fecha de expiración de tarea:</label>
            <input
              type="datetime-local"
              name="expiration_task_date"
              value={dayjs(newEvent.expiration_task_date).format('YYYY-MM-DDTHH:mm')}
              onChange={handleInputChange}
              required
              className={getInputClassName('expiration_task_date')}
            />
            {errors.expiration_task_date && <span className="error-message">{errors.expiration_task_date}</span>}
          </div>
          <div className="form-group">
            <label>Estado de tarea:</label>
            <select
              name="progress_task"
              value={newEvent.id_user}
              onChange={handleInputChange}
              required
              className="form-input"
            >
              <option value="">Seleccione un estado para la tarea</option>
              {tasks.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Fecha de expiración:</label>
            <input
              type="datetime-local"
              name="finalization_task_date"
              value={dayjs(newEvent.finalization_task_date).format('YYYY-MM-DDTHH:mm')}
              onChange={handleInputChange}
              required
              className={getInputClassName('finalization_task_date')}
            />
            {errors.finalization_task_date && <span className="error-message">{errors.finalization_task_date}</span>}
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
