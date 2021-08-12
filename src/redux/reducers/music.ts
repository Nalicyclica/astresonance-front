import { createSlice} from '@reduxjs/toolkit';
import { RootState } from '../stores/configureStore';

type Music = {
  category_id: Number
  genre_id: Number
  playing: Boolean
}

const initialState: Music = {
  category_id: 0,
  genre_id: 0,
  playing: false
}

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    loadMusic: (state, action) => {
      // state = { ...action.payload};<-これ浅い更新で再レンダリングされない
      return Object.assign({},action.payload)
    },
  },
})

export const { loadMusic } = musicSlice.actions;

export const selectMusic = (state: RootState) =>
  state.musicReducer
  
export default musicSlice.reducer