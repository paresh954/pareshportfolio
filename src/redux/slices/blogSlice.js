import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const res = await axios.get("https://backend-l5js.onrender.com/api/blogs");
  return res.data;
});

export const deleteBlog = createAsyncThunk(
  "projects/deleteBlog",
  async (id) => {
    const token = localStorage.getItem("adminToken");
    const res = await axios.delete(`https://backend-l5js.onrender.com/api/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

const blgoSlice = createSlice({
  name: "blogs",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    count: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.items = action.payload;
        state.count = action.payload.length;
        state.status = "succeeded";
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(deleteBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        state.status = "succeeded";
        state.count = state.items.length;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default blgoSlice.reducer;
