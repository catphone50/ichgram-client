import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, getUserInfo } from "./userActions";

const initialState = {
  user: {
    avatar: "",
    description: "",
    id: "",
    fullName: "",
    email: "",
    username: "",
    createdAt: "",
  },
  isLoading: false,
  error: null,
  isLoggedIn: false,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.id = action.payload.user.id;
        state.user.username = action.payload.user.username;
        state.user.avatar = action.payload.user.avatar;
        state.token = action.payload.token;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user.id = action.payload.user.id;
        state.user.username = action.payload.user.username;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.fullName = action.payload.fullName;
        state.user.description = action.payload.description;
        state.user.createdAt = action.payload.createdAt;
        state.isLoading = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
