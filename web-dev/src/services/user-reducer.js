import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "./user-service";

export const loginThunk = createAsyncThunk("users/login", async (credentials) => {
  const user = await authService.login(credentials);
  return user;
});

export const profileThunk = createAsyncThunk("users/profile", async () => {
  const response = authService.profile();
  return response.data;
});

export const logoutThunk = createAsyncThunk("users/logout", async () => {
  return await authService.logout();
});

export const registerThunk = createAsyncThunk("users/register", async (user) => {
  return await authService.register(user);
});

const userSlice = createSlice({
  name: "user",
  initialState: { currentUser: null },
  reducers: {},
  extraReducers: {
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },
    [logoutThunk.fulfilled]: (state) => {
      state.currentUser = null;
    },
    [profileThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },
    [profileThunk.rejected]: (state, { payload }) => {
      state.currentUser = null;
    },
    [profileThunk.pending]: (state, action) => {
      state.currentUser = null;
    },
    [registerThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});
export default userSlice.reducer;
