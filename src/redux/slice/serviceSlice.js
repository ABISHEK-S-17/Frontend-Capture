import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ======================= 1. GET Services  =======================
export const getServices = createAsyncThunk(
  "service/getServices",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/services");
      return res.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load services");
    }
  }
);

// ======================= 2. CREATE Service  =======================
export const createService = createAsyncThunk(
  "service/createService",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/service/createService", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create service");
    }
  }
);

// ======================= 3. UPDATE Service  =======================
export const updateService = createAsyncThunk(
  "service/updateService",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/admin/service/updateService/${id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update service");
    }
  }
);

// ======================= 4. DELETE Service  =======================
export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      await api.put(`/admin/service/deleteService/${id}`);
      return id; // to remove from state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete service");
    }
  }
);

// ======================= Slice Setup =======================
const serviceSlice = createSlice({
  name: "service",
  initialState: {
    services: [],
    loading: false,
    error: null,
    success: false
  },

  reducers: {
    resetServiceState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },

  extraReducers: (builder) => {
    builder
      // Get
      .addCase(getServices.pending, (state) => { state.loading = true; })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createService.pending, (state) => { state.loading = true; })
      .addCase(createService.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateService.pending, (state) => { state.loading = true; })
      .addCase(updateService.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteService.pending, (state) => { state.loading = true; })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(s => s.id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { resetServiceState } = serviceSlice.actions;
export default serviceSlice.reducer;
