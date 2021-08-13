import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { RootState } from '../stores/configureStore';
import axios from 'axios'

type User = {
  id: number
  nickname: string
  icon_color: string
}
type Music = {
  id: number
  category_id: number
  genre_id: number
  user: User
  music_url: string
  created_at: string
  updated_at: string
  playing: Boolean
}

const initialState: Music[] = []

export const fetchMusic = createAsyncThunk(
  "music/fetchMusic",
  async () => {
    const res = await axios.get("http://localhost:3001/musics")
    return { music: res.data }
  }
);

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    loadMusic: (state, action) => {
      // state = { ...action.payload};<-これ浅い更新で再レンダリングされない
      return Object.assign({},action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMusic.fulfilled, (state, action) => {
      return action.payload.music;
    })
  },
})

export const { loadMusic } = musicSlice.actions;

export const selectMusic = (state: RootState) =>
  state.musicReducer
  
export default musicSlice.reducer