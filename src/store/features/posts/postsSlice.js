import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts,
  createPost,
  deletePost,
  fetchUserPosts,
  fetchPostsById,
  fetchPostsByLimit,
  fetchPostsByLikesAndLimit,
} from "./postActions";

const initialState = {
  posts: [],
  userPosts: [],
  post: null,
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch user posts
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create a new post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.userPosts.unshift(action.payload.post);
        state.isLoading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete a post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        //  console.log(action.payload);
        state.userPosts = state.userPosts.filter(
          (post) => post._id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch posts by ID
      .addCase(fetchPostsById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsById.fulfilled, (state, action) => {
        //   console.log("Fetched post data in reducer:", action.payload);
        state.post = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPostsById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch posts by limit
      .addCase(fetchPostsByLimit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsByLimit.fulfilled, (state, action) => {
        //   console.log("Fetched post data in reducer:", action.payload);
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPostsByLimit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch posts by likes
      .addCase(fetchPostsByLikesAndLimit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsByLikesAndLimit.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPostsByLikesAndLimit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = postSlice.actions;

export default postSlice.reducer;
