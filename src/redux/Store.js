import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';

export default configureStore({
  reducer: {
    user: UserSlice, // Agregar el slice de usuario al store para poder acceder a él desde cualquier componente.
  },
});