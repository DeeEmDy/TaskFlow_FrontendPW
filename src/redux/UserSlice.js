import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../axios_helper';

// Acción asíncrona para el login del usuario
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await request('POST', '/login', data);

      if (response.status !== 200) {
        const errorData = await response.data;
        return rejectWithValue(errorData);
      }

      const result = await response.data;
      localStorage.setItem('auth_token', result.token); // Almacena el token en localStorage
      return result; // Retorna el usuario
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Error en la red." }); // Manejo de errores de red
    }
  }
);

// Acción asíncrona para el registro del usuario
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await request('POST', '/register', data);

      if (response.status !== 200) {
        const errorData = await response.data;
        return rejectWithValue(errorData);
      }

      const result = await response.data;
      localStorage.setItem('auth_token', result.token); // Almacena el token en localStorage
      return result; // Retorna el usuario
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Error en la red." }); // Manejo de errores de red
    }
  }
);

// Slice para manejar el estado del usuario
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // Almacena los datos del usuario
    userCurrent: null, // Almacena el usuario actual para get by id
    message: '', // Almacena el mensaje de la petición
    loading: false,
    errorRedux: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('auth_token');
      state.user = null;
    },
    resetError: (state) => {
      state.errorRedux = null; // Resetea los errores
    },
    resetMessage: (state) => {
      state.message = ''; // Resetea los mensajes
    },
  },
  extraReducers: (builder) => {
    // Reducers para el login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = '';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.message = 'Login exitoso.';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.errorRedux = action.payload || { message: 'Error desconocido durante el login' };
    });

    // Reducers para el registro
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = '';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.message = 'Registro exitoso.';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.errorRedux = action.payload || { message: 'Error desconocido durante el registro' };
    });
  },
});

// Exporta las acciones y el reducer
export const { logout, resetError, resetMessage } = userSlice.actions;
export default userSlice.reducer;
