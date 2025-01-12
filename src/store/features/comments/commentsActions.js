import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Добавление комментария
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ userId, postId, text }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/comments/add",
        {
          userId,
          postId,
          text,
        }
      );

      return response.data.comment;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Удаление комментария
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ commentId, userId }, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/comments/${commentId}`, {
        data: { userId },
      });
      return commentId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Получение комментариев по посту
export const getCommentsByPost = createAsyncThunk(
  "comments/getCommentsByPost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/comments/post/${postId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Получение комментария по ID
export const getCommentById = createAsyncThunk(
  "comments/getCommentById",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/comments/${commentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
