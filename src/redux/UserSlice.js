import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../axios_helper';

// Acción asíncrona para el login del usuario
export const login = createAsyncThunk(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await request('POST', '/login', data);
      if (!response.token) { // Asegúrate de que `token` está presente en la respuesta
        return rejectWithValue(response); // Error del backend
      }
      sessionStorage.setItem('auth_token', response.token); // Guarda el token en sessionStorage
      sessionStorage.setItem('refresh_token', response.refreshToken || ''); // Si hay un refreshToken, guárdalo
      return response;
    } catch (error) {
      console.error("Error en el login:", error); // Agrega esta línea para más detalles del error
      return rejectWithValue(error.response?.data || { message: 'Error en la red.' });
    }
  }
);

// Acción asíncrona para el registro del usuario
export const register = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await request('POST', '/register', data);
      // No esperamos ni manejamos un token en el registro, solo verificamos el estado de éxito

      console.log("Data del registro:", data);
      console.log("Respuesta del registro:", response);

      return response;
    } catch (error) {
      console.error("Error en el registro:", error); // Agrega esta línea para más detalles del error
      return rejectWithValue(error.response?.data || { message: 'Error en la red.' });
    }
  }
);

// Acción asíncrona para refrescar el token
export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (_, { rejectWithValue }) => {
    const refreshToken = sessionStorage.getItem('refresh_token');
    if (!refreshToken) {
      return rejectWithValue({ message: "No refresh token found" });
    }

    try {
      const response = await request('POST', '/refresh-token', { refreshToken });

      if (response.status !== 200) {
        return rejectWithValue(response);
      }

      const result = response.data;
      sessionStorage.setItem('auth_token', result.token); // Guarda el nuevo token en sessionStorage
      return result;
    } catch (error) {
      console.error("Error al refrescar el token:", error); // Agrega esta línea para más detalles del error
      return rejectWithValue(error.response?.data || { message: "Error en la red." });
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    userCurrent: null,
    message: '',
    loading: false,
    errorRedux: null,
  },
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('refresh_token');
      state.user = null;
    },
    resetError: (state) => {
      state.errorRedux = null;
    },
    resetMessage: (state) => {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = '';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user; // Guarda la información del usuario
      state.message = 'Login exitoso.';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.errorRedux = action.payload || { message: 'Error desconocido durante el login' };
    });

    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = '';
    });
    builder.addCase(register.fulfilled, (state, action) => { 
      state.loading = false;
      state.message = 'Registro exitoso.';
      state.userCurrent = action.payload; // Almacena el usuario registrado
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.errorRedux = action.payload || { message: 'Error desconocido durante el registro' };
    });

    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = '';
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => { //eslint-disable-line 
      state.loading = false;
      state.message = 'Token refrescado exitosamente.';
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.loading = false;
      state.errorRedux = action.payload || { message: 'Error desconocido durante el refrescamiento del token' };
    });
  },
});

export const { logout, resetError, resetMessage } = userSlice.actions;
export default userSlice.reducer;
