import axios from 'axios';

// Configurar la instancia de axios
const instance = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esta URL si es necesario
});
//

// Añadir un interceptor para agregar el token de autorización a cada solicitud
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Modifica la función para manejar la respuesta y errores adecuadamente
export const request = async (method, url, data) => {
  try {
    const response = await instance.request({ 
      method,
      url, 
      data
    });
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud:", error); // Agrega esta línea para más detalles del error
    return Promise.reject(error.response?.data || { message: 'Error en la red.' });
  }
};

export default instance;
