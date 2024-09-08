// axios_helper.jsx
import axios from 'axios';

// Configuración global de Axios
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Función para obtener el token
export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

// Función para guardar el token
export const setAuthToken = (token) => {
    window.localStorage.setItem('auth_token', token);
};

// Función para hacer solicitudes con Axios
export const request = (method, url, data) => {
    // Establecer headers iniciales
    let headers = {};

    // Incluir el token solo si no es una solicitud a la ruta de registro o login
    if (getAuthToken() && !url.includes('/register') && !url.includes('/login')) {
        headers.Authorization = `Bearer ${getAuthToken()}`;
    }

    return axios({
        method,
        url,
        headers,
        data
    });
};
