import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // URL de la API del backend
});

// Interceptor de solicitud para agregar el token al encabezado
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token'); // Obtener token de sessionStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Agregar token al encabezado
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
