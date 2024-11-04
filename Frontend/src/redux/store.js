import { configureStore } from '@reduxjs/toolkit';
import uploadReducer from './uploadSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    auth: authReducer,
  },
});