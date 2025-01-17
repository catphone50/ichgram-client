import { createSlice } from "@reduxjs/toolkit";
import { getUserWithPosts } from "./profileActions";

const initialState = {
  user: {
    avatar: "",
    description: "",
    id: "",
    fullName: "",
    email: "",
    username: "",
    following: [],
    followers: [],
    createdAt: "",
    posts: [],
  },
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserWithPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserWithPosts.fulfilled, (state, action) => {
        state.user.id = action.payload._id;
        state.user.username = action.payload.username;
        state.user.avatar = action.payload.avatar;
        state.user.email = action.payload.email;
        state.user.fullName = action.payload.fullName;
        state.user.description = action.payload.description;
        state.user.createdAt = action.payload.createdAt;
        state.user.posts = action.payload.posts;
        state.user.following = action.payload.following;
        state.user.followers = action.payload.followers;
        state.isLoading = false;
      })
      .addCase(getUserWithPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
