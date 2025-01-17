import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const followUser = createAsyncThunk(
  "users/followUser",
  async ({ followerId, followingId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/follow/follow",
        {
          followerId,
          followingId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async ({ followerId, followingId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/follow/unfollow",
        {
          followerId,
          followingId,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFollowers = createAsyncThunk(
  "users/fetchFollowers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/follow/followers/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  "users/fetchFollowing",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/follow/following/${userId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
