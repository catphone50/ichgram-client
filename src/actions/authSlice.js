import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startRegistration: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registrationSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    registrationFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const {
  startRegistration,
  registrationSuccess,
  registrationFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

export const registerUser = (userData) => async (dispatch) => {
  dispatch(startRegistration());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      userData
    );
    dispatch(registrationSuccess(response.data));
  } catch (error) {
    dispatch(registrationFailure(error.response.data.message || error.message));
  }
};
