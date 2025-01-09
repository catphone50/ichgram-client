import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/posts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (_, { rejectWithValue, getState }) => {
    const userId = getState().user.user?.id;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/posts/user/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post, { rejectWithValue, getState }) => {
    const userId = getState().user.user?.id;

    try {
      const response = await axios.post(
        `http://localhost:3000/api/posts/${userId}`,
        post
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      return postId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
