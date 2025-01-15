import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return { user: response.data.user, token: response.data.token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (userId, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    if (!token) {
      return rejectWithValue("No token found");
    }
    if (!userId) {
      return rejectWithValue("No user ID provided");
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (userData, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    const userId = getState().user.user?.id;

    if (!token) {
      return rejectWithValue("No token found");
    }
    if (!userId) {
      return rejectWithValue("No user ID found");
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getUserWithPosts = createAsyncThunk(
  "user/getUserWithPosts",
  async (userId, { rejectWithValue, getState }) => {
    console.log(userId);

    const token = getState().user.token;
    if (!token) {
      return rejectWithValue("No token found");
    }
    if (!userId) {
      return rejectWithValue("No user ID provided");
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/${userId}/with-posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// В файле userActions.js
export const clearError = () => {
  console.log("Clearing error");
  return {
    type: "CLEAR_ERROR",
  };
};
