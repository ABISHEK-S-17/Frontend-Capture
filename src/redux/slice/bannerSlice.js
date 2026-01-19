import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// 1. GET Banners
export const getBanners = createAsyncThunk(
  "banner/getBanners",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/banners");
      return res.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load banners");
    }
  }
);

// 2. CREATE Banner
export const createBanner = createAsyncThunk(
  "banner/createBanner",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/banner/createBanner", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create banner");
    }
  }
);

// 3. UPDATE Banner
export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/admin/banner/updateBanner/${id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update");
    }
  }
);

// 4. DELETE Banner
export const deleteBanner = createAsyncThunk(
  "banner/deleteBanner",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`/admin/banner/deleteBanner/${id}`);
      return id; // so reducer can remove item
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete");
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetBannerState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get banners
      .addCase(getBanners.pending, (state) => { state.loading = true; })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createBanner.pending, (state) => { state.loading = true; })
      .addCase(createBanner.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateBanner.pending, (state) => { state.loading = true; })
      .addCase(updateBanner.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteBanner.pending, (state) => { state.loading = true; })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = state.banners.filter(b => b.id !== action.payload);
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBannerState } = bannerSlice.actions;
export default bannerSlice.reducer;
