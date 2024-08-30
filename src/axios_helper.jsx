import axios from 'axios';

// Configuración global de Axios
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

//Configuración para que pueda recibir el JWT Token mediante el header.
export const getAuthToken = () => {

    return window.localStorage.getItem('auth_token');
};


// Función para guardar el token en el local storage en la variable token
export const setAuthToken = (token) => {
    window.localStorage.setItem('auth_token', token);
}

export const request = (method, url, data) => {

    let headers = {};

    if (getAuthToken() !== null && getAuthToken() !== "null") {

        // Si hay un token, se agrega el header de Authorization
        headers = {Authorization: `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    });
}