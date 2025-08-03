import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from './selectedSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    selected: selectedReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
