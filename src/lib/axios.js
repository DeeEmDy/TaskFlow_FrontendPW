import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // URL de la API del backend
});

// Interceptor de solicitud para agregar el token al encabezado
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    console.log("Token presente en axios.js:", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Agregar token al encabezado
        console.log("Token agregado al encabezado de la solicitud:", token);
    }
    return config;
}, (error) => {

    console.log("Error al agregar token al encabezado de la solicitud:", error);
    return Promise.reject(error);
});


export default api;
