import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "http://localhost:8000/posts",
  async () => {
    const response = await axios.get("http://localhost:8000/posts");
    return response.data;
  }
);

const fetchSlice = createSlice({
  name: "fetchData",
  initialState: {
    loading: false,
    fetchData: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        // Add any fetched posts to the array
        state.fetchData = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { usersLoading, usersReceived } = fetchSlice.actions;
export default fetchSlice.reducer;
