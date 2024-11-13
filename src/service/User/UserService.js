import { isAxiosError } from "axios";
import api from "../../lib/axios";

// Función para manejar errores de la API
function handleApiError(error) {
    if (isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error?.message || "Error en el servidor, intenta de nuevo.";
        const errorCode = error.response.data.error?.code || "UNKNOWN_ERROR";
        const errorDetails = error.response.data.error?.errors || [];

        return {
            success: false,
            error: {
                code: errorCode,
                message: errorMessage,
                errors: errorDetails
            }
        };
    }

    return {
        success: false,
        error: {
            code: "UNKNOWN_ERROR",
            message: "Error inesperado al procesar la solicitud",
            errors: []
        }
    };
}

// Manejo de la solicitud para obtener el usuario por email
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
        throw handleApiError(error);
    }
}

// Manejo de la solicitud para cerrar sesión
export async function logout() {
    try {
        const token = sessionStorage.getItem('token'); // Cambiar de localStorage a sessionStorage

        // Verificación detallada del token
        console.log("Token presente en UserService.js:", token);
        if (!token) {
            console.log("No se encontró un token en sessionStorage.");
            throw new Error("No se encontró un token de autenticación.");
        }

        console.log("Realizando la solicitud de logout con el token:", token);

        // Realizar la solicitud de logout al servidor
        const { data } = await api.delete("/auth/logout", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Verificar si la respuesta del servidor indica éxito
        if (data.success) {
            console.log("Sesión cerrada correctamente, eliminando token de sessionStorage.");
            sessionStorage.removeItem('token'); // Eliminar el token de sessionStorage
            return {
                success: true,
                message: "Sesión cerrada correctamente"
            };
        } else {
            console.log("Error al intentar cerrar sesión:", data);
            // Si la respuesta del servidor no es exitosa, lanzar un error con detalles
            throw new Error(JSON.stringify({
                code: data.error?.code || "UNKNOWN_ERROR",
                message: data.error?.message || "Error desconocido en el servidor",
                errors: data.error?.errors || []
            }));
        }
    } catch (error) {
        // Manejo de errores y depuración
        console.error("Error al cerrar sesión:", error);
        throw handleApiError(error); // Función de manejo de errores (ajústala según sea necesario)
    }
}

