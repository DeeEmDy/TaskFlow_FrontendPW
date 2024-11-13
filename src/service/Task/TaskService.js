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

//Crear una tarea.
export async function createTask(task) {
    try {
        const { data } = await api.post("/task/create", task);

        if (data.success) {
            return {
                success: true,
                message: "Tarea creada correctamente",
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

//Obtener todas las tareas.
export async function getAllTasks() {
    try {
        const { data } = await api.get("/task/getAll");

        if (data.success) {
            return {
                success: true,
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

//Obtener una tarea por su ID.
export async function getTaskById(id) {
    try {
        const { data } = await api.get(`/task/getById/${id}`);

        if (data.success) {
            return {
                success: true,
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

//Actualizar una tarea por su ID.
export async function updateTask(id, task) {
    try {
        const { data } = await api.put(`/task/update/${id}`, task);

        if (data.success) {
            return {
                success: true,
                message: "Tarea actualizada correctamente",
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

//Eliminar una tarea por su ID.
export async function deleteTask(id) {
    try {
        const { data } = await api.delete(`/task/delete/${id}`);

        if (data.success) {
            return {
                success: true,
                message: "Tarea eliminada correctamente"
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
