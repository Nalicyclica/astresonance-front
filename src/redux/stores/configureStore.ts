import { configureStore } from '@reduxjs/toolkit';
import musicReducer from '../reducers/music'
import userReducer from '../reducers/user'

export const store = configureStore({
  reducer: {
    musicReducer: musicReducer,
    userReducer: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AsyncThunkConfig<T = unknown> = {
  state: RootState
  dispatch: typeof store.dispatch
  extra: string
  rejectValue: T
}