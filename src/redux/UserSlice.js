import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../axios_helper';

// Acción asíncrona para el login del usuario
export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await request('POST', '/login', data);
      if (!response.token) {
        return rejectWithValue({ message: 'Token no recibido' }); // Error del backend
      }
      sessionStorage.setItem('auth_token', response.token);
      sessionStorage.setItem('refresh_token', response.refreshToken || '');
      return response;
    } catch (error) {
      console.error("Error en el login:", error);
      return rejectWithValue(error.response?.data || { message: 'Error en la red.' });
    }
  }
);

// Acción asíncrona para el registro del usuario
export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await request('POST', '/register', data);
      console.log("Data del registro:", data);
      console.log("Respuesta del registro:", response);
      return response;
    } catch (error) {
      console.error("Error en el registro:", error);
      return rejectWithValue(error.response?.data || { message: 'Error en la red.' });
    }
  }
);

// Acción asíncrona para refrescar el token
export const refreshToken = createAsyncThunk(
  'auth/refresh-token',
  async (_, { rejectWithValue }) => {
    const refreshToken = sessionStorage.getItem('refresh_token');
    if (!refreshToken) {
      return rejectWithValue({ message: "No se encontró el refresh token" });
    }

    try {
      const response = await request('POST', '/refresh-token', { refreshToken });

      if (response.status !== 200) {
        return rejectWithValue({ message: "Error al refrescar el token" });
      }

      const result = response.data;
      sessionStorage.setItem('auth_token', result.token); // Guarda el nuevo token en sessionStorage
      return result;
    } catch (error) {
      console.error("Error al refrescar el token:", error);
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
      state.user = action.payload.user;
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
      state.userCurrent = action.payload;
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
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading = false;
      state.message = 'Token refrescado exitosamente.';
      state.user = action.payload.user; // Actualiza el usuario en el estado
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.loading = false;
      state.errorRedux = action.payload || { message: 'Error desconocido durante el refrescamiento del token' };
    });
  },
});

export const { logout, resetError, resetMessage } = userSlice.actions;
export default userSlice.reducer;
