import { configureStore } from '@reduxjs/toolkit';
import musicReducer from '../reducers/music'

export const store = configureStore({
  reducer: {
    musicReducer: musicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;