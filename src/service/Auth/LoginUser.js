import { isAxiosError } from "axios";
import api from "../../lib/axios";

export async function loginUser(credentialsDto) {
    try {
        const { data } = await api.post("/auth/login", credentialsDto);

        // Verificamos si la respuesta es exitosa
        if (data.success) {
            const { token, user } = data.data;  // Desestructuramos el token y los datos del usuario

            // Guardamos el token en el sessionStorage (el usuario será manejado por el AuthContext)
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));  // Guardamos el usuario en sessionStorage

            return {
                success: true,
                message: "Inicio de sesión exitoso",
                data: { token, user }  // Retornamos tanto el token como los datos del usuario
            };
        }

        // Si no es exitoso, lanzamos un error con la información correspondiente
        throw new Error(JSON.stringify({
            code: data.error?.code || "UNKNOWN_ERROR",
            message: data.error?.message || "Error desconocido en el servidor",
            errors: data.error?.errors || []
        }));
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error?.message || "Error en el servidor, intenta de nuevo.";
            const errorCode = error.response.data.error?.code || "UNKNOWN_ERROR";
            const errorDetails = error.response.data.error?.errors || [];

            const errorResponse = {
                success: false,
                error: {
                    code: errorCode,
                    message: errorMessage,
                    errors: errorDetails
                }
            };

            throw errorResponse;  // Lanzamos el objeto de error
        }

        // Si ocurre un error inesperado
        throw new Error(JSON.stringify({
            success: false,
            error: {
                code: "UNKNOWN_ERROR",
                message: "Error inesperado al procesar la solicitud",
                errors: []
            }
        }));
    }
}
