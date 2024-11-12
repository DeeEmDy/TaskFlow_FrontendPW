import { isAxiosError } from "axios";
import api from "../../lib/axios";

export async function loginUser(credentialsDto) {
    try {
        const { data } = await api.post("/auth/login", credentialsDto);

        //console.log("Data obtenida del login:" + JSON.stringify(data));
        if (data.success) {
            sessionStorage.setItem('token', data.data.token);
            //console.log("Token obtenido del login:" + data.data.token);
            return {
                success: true,
                message: "Inicio de sesión exitoso",
                data: data.data
            };
        }


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

            throw errorResponse;
        }

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
