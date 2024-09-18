import axios from 'axios';

// Configurar la instancia de axios
const instance = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esta URL si es necesario
});

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

// Añadir un interceptor para manejar respuestas y errores
instance.interceptors.response.use( //Captura todos los errores que ocurren durante la respuesta de una solicitud. Esto te permite manejar errores de forma centralizada.

  (response) => response,
  (error) => {
    // Manejar el error aquí
    console.error("Error en la solicitud:", error); // Proporciona detalles del error

    // Si el error tiene una respuesta, usa el mensaje de error de la respuesta
    const errorMessage = error.response?.data?.message || 'Error en la red.';

    // Puedes personalizar el manejo de errores aquí, como redirigir al usuario a una página de error
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status || 500,
    });
  }
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
    // Agrega información detallada del error para la depuración
    console.error("Error en la solicitud:", error);
    // Lanza el error para que pueda ser manejado en el componente que hace la solicitud
    throw error;
  }
};

export default instance;
