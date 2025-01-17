import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    if (!token) {
      return rejectWithValue("No token found");
    }
    console.log(query);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/search/search?query=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
