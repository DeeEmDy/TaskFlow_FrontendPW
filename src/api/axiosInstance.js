import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado en localStorage o sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Manejo de errores global
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Error 401: No autorizado. Redirigiendo al login.');
       // window.location.href = '/'; // Redirige al usuario a la página de login
      } else {
        console.error('Error en la solicitud:', error.response.data || error.message);
      }
    } else {
      console.error('Error en la solicitud:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
