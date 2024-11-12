import { isAxiosError } from "axios";
import api from "../../lib/axios";

//http://localhost:8080/user/getByEmail
export async function getUserByEmail(email) {
    try {
        const { data } = await api.get(`/user/getByEmail/${email}`);
        if (data.success) {
            return {
                success: true,
                message: "Usuario encontrado",
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

