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
  async (_, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    const userId = getState().user.user?.id;

    if (!token) {
      return rejectWithValue("No token found");
    }
    if (!userId) {
      return rejectWithValue("No user ID found");
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
