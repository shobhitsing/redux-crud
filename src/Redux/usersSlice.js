import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userPosts = createAsyncThunk(
  "http://localhost:8000/posts",
  async (data) => {
    const response = await axios.post("http://localhost:8000/posts", data);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userPosts.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(userPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { usersLoading, usersReceived } = usersSlice.actions;
export default usersSlice.reducer;
