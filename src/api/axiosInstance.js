
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Manejo de errores global
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes manejar errores, como mostrar un mensaje
    console.error('Error en la solicitud:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;

