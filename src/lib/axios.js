import axios from 'axios';

// Crear instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:8080',  // Cambia esta URL a la de tu API
});

// Establecer el token en los headers de todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Añadir el token en el header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
