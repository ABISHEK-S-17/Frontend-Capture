import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ================= GET Blogs =================
export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/blogs");
      return res.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load blogs");
    }
  }
);

// ================= CREATE Blog =================
export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/blog/createBlog", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create blog");
    }
  }
);

// ================= UPDATE Blog =================
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/admin/blog/updateBlog?id=${id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update blog");
    }
  }
);

// ================= DELETE Blog =================
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      await api.put(`/admin/blog/deleteBlog?id=${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete blog");
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => { state.loading = true; })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })

      .addCase(updateBlog.fulfilled, (state, action) => {
        const i = state.blogs.findIndex(b => b.id === action.payload.id);
        if (i !== -1) state.blogs[i] = action.payload;
      })

      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(b => b.id !== action.payload);
      });
  }
});

export default blogSlice.reducer;
