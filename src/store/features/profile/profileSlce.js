import { createSlice } from "@reduxjs/toolkit";
import { getProfileById } from "./profileActions";

const initialState = {
  profile: {
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
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = profileSlice.actions;

export default profileSlice.reducer;
