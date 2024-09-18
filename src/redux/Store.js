import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
// Importa otros slices si es necesario

const store = configureStore({
  reducer: {
    user: UserSlice,
    // Agrega otros slices aquí si es necesario
  },
  devTools: import.meta.env.VITE_ENV !== 'production', // Usa VITE_ENV para controlar Redux DevTools
});

export default store;
