import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLogin: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export const { startLogin, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(startLogin());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      credentials
    );

    dispatch(
      loginSuccess({ user: response.data.user, token: response.data.token })
    );
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || error.message));
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
