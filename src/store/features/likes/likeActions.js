import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Like Post
export const likePost = createAsyncThunk(
  "likes/likePost",
  async ({ userId, postId }, { rejectWithValue }) => {
    const user = localStorage.getItem("user");
    const username = JSON.parse(user).username;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/likes/like",
        {
          userId,
          postId,
          username,
          type: "liked post",
        }
      );

      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Unlike Post
export const unlikePost = createAsyncThunk(
  "likes/unlikePost",
  async ({ userId, postId }, { rejectWithValue }) => {
    const user = localStorage.getItem("user");
    const username = JSON.parse(user).username;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/likes/unlike",
        {
          userId,
          postId,
          username,
          type: "liked post",
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Likes for Post
export const fetchLikes = createAsyncThunk(
  "likes/fetchLikes",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/likes/likes/${postId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Like Comment
export const likeComment = createAsyncThunk(
  "likes/likeComment",
  async ({ userId, commentId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/likes/comment/like",
        {
          userId,
          commentId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error liking comment:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Unlike Comment
export const unlikeComment = createAsyncThunk(
  "likes/unlikeComment",
  async ({ userId, commentId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/likes/comment/unlike",
        {
          userId,
          commentId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error liking comment:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Likes for Comment
export const fetchCommentLikes = createAsyncThunk(
  "likes/fetchCommentLikes",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/likes/comment/likes/${commentId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Comment Likes Count
export const fetchCommentLikesCount = createAsyncThunk(
  "likes/fetchCommentLikesCount",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/likes/comment/likes/count/${commentId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
