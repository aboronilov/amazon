import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isAuthenticated: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;