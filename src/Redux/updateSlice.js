import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateData = createAsyncThunk(
  "http://localhost:8000/posts",
  async (data, id) => {
    const response = await axios.put(`http://localhost:8000/posts${id}`, data);
    return response.data;
  }
);

const updateSlice = createSlice({
  name: "updateData",
  initialState: {
    loading: false,
    updateData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateData.pending, (state) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.updateData = action.payload;
        state.loading = false;
        // return state.filter((item) => item.id !== editItemId);
      })
      .addCase(updateData.rejected, (state, action) => {
        // Handle error state if needed
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { usersLoading, usersReceived } = updateSlice.actions;
export default updateSlice.reducer;
