import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts/posts");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPostsById = createAsyncThunk(
  "posts/fetchPostsById",
  async (postId, { rejectWithValue }) => {
    //  console.log("Fetching post with ID:", postId);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/posts/${postId}`
      );
      //  console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching post:", error);
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (_, { rejectWithValue, getState }) => {
    const userId = getState().user.user?.id;

    if (!userId) {
      return rejectWithValue("No user ID found");
    }

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
    const token = getState().user.token;

    if (!token) {
      return rejectWithValue("No token found");
    }
    if (!userId) {
      return rejectWithValue("No user ID found");
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/posts/${userId}`,
        post,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { getState, rejectWithValue }) => {
    const userId = getState().user.user?.id;
    const token = getState().user.token;

    if (!token) {
      return rejectWithValue("No token found");
    }
    if (!userId) {
      return rejectWithValue("No user ID found");
    }

    try {
      await axios.delete(`http://localhost:3000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { userId },
      });

      console.log("Post deleted successfully", postId);
      return postId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// console.log("action", response.data);
