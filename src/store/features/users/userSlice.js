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

const loadStateFromLocalStorage = () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      return {
        user: {
          avatar: user.avatar,
          description: "",
          id: user.id,
          fullName: "",
          email: "",
          username: user.username,
          createdAt: "",
        },
        isLoading: false,
        error: null,
        isLoggedIn: true,
        token,
      };
    }
    return initialState;
  } catch (error) {
    console.error("Error loading state from localStorage", error);
    return initialState;
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: loadStateFromLocalStorage(),
  reducers: {
    logout: (state) => {
      state.user = { ...initialState.user };
      state.isLoggedIn = false;
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      console.log("Clearing error");
      state.error = null;
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
      .addCase(registerUser.fulfilled, (state) => {
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

export const { logout, clearError } = userSlice.actions;

export default userSlice.reducer;
