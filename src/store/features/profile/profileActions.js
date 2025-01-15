import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Действие для получения профиля пользователя по ID
export const getProfileById = createAsyncThunk(
  "profile/getProfileById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
