//現在ログインしているユーザーの情報管理

import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { RootState, AsyncThunkConfig } from '../stores/configureStore';
import axios from 'axios'

type Profile = {
  introduce: string
}

export type User = {
  id: number
  nickname: string
  icon_color: string
  email: string
  password: string
  password_confirmation: string
  
}

export const defUser: User ={
  id: -1,
  nickname: "",
  icon_color: "",
  email: "",
  password: "",
  password_confirmation: ""
}

const initialState: User = defUser

export const userSignUp = createAsyncThunk<
  void,
  User,
  AsyncThunkConfig<{ errorMessages: string[]}>
  >(
  "user/userSignUp",
  async (inputUser, thunkAPI) => {
    const res = await axios.post("http://localhost:3001/users/sign_up", inputUser);
    console.log(res);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDefault: (state, action) => {
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      console.log(action.payload);
    })
  },
})

export const { userDefault } = userSlice.actions;

export const authUser = (state: RootState) =>
  state.userReducer
  
export default userSlice.reducer