import { isAxiosError } from "axios";
import api from "../../lib/axios"; // Asegúrate de importar correctamente tu cliente axios

// Función para registrar un nuevo usuario
export async function registerUser(signUpDto) {
  try {
    // Realizamos la solicitud POST al backend
    const { data } = await api.post("/auth/register", signUpDto);

    // Verificamos si la respuesta es exitosa
    if (data.success) {
      // Si es exitosa, retornamos los datos del usuario
      return { success: true, data: data.data };
    } else {
      // Si la respuesta contiene un error
      const errorMessage = data.error?.message || "Error desconocido en el servidor";
      const errorDetails = data.error?.errors || []; // Recogemos los errores de validación si existen
      return {
        success: false,
        error: errorMessage,
        details: errorDetails, // Incluir detalles específicos de validación
      };
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // Si hay un error de la API, obtenemos el mensaje de error desde la respuesta
      const errorMessage = error.response.data.message || "Error en el servidor";
      return { success: false, error: errorMessage };
    } else {
      // Si hay un error de conexión o cualquier otro tipo de error
      return { success: false, error: "Error de conexión o inesperado" };
    }
  }
}
