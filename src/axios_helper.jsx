import axios from 'axios';

// Configuración global de Axios
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Función para hacer solicitudes HTTP
export const request = (method, url, data) => {
    return axios({
        method,
        url,
        data,
    });
};
