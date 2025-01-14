import { createSlice } from "@reduxjs/toolkit";
import {
  likePost,
  unlikePost,
  fetchLikes,
  likeComment,
  unlikeComment,
  fetchCommentLikes,
  fetchCommentLikesCount,
} from "./likeActions";

const initialState = {
  postLikes: [],
  commentLikes: [],
  isLoading: false,
  error: null,
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Like post
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.postLikes.push(action.payload);
        state.isLoading = false;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Unlike post
      .addCase(unlikePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.postLikes = state.postLikes.filter(
          (like) => like._id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch likes
      .addCase(fetchLikes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.postLikes = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Like comment
      .addCase(likeComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.commentLikes.push(action.payload);
        state.isLoading = false;
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Unlike comment
      .addCase(unlikeComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unlikeComment.fulfilled, (state, action) => {
        state.commentLikes = state.commentLikes.filter(
          (like) => like._id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(unlikeComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch comment likes
      .addCase(fetchCommentLikes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommentLikes.fulfilled, (state, action) => {
        state.commentLikes = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCommentLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch comment likes count
      .addCase(fetchCommentLikesCount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommentLikesCount.fulfilled, (state, action) => {
        state.likesCount = action.payload.likesCount;
        state.isLoading = false;
      })
      .addCase(fetchCommentLikesCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = likeSlice.actions;

export default likeSlice.reducer;
