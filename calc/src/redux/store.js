import { configureStore } from '@reduxjs/toolkit';
import calkReducer from './calkSlice';

export const store = configureStore({
  reducer: {
    calk: calkReducer,
  },
});
