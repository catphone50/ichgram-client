import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Действие для получения профиля пользователя по ID
export const getUserWithPosts = createAsyncThunk(
  "user/getUserWithPosts",
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
