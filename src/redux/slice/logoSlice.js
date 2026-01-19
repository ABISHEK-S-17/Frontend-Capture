import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ============ GET LOGOS (PUBLIC) ============
export const getLogos = createAsyncThunk(
  "logo/getLogos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/logos");

      const data = res.data?.data;

      // ✅ Always return ARRAY
      if (Array.isArray(data)) return data;
      if (data && typeof data === "object") return [data];
      return [];

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load logos"
      );
    }
  }
);

// ================= SLICE =================
const logoSlice = createSlice({
  name: "logo",
  initialState: {
    logos: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getLogos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLogos.fulfilled, (state, action) => {
        state.loading = false;
        state.logos = action.payload || [];
      })
      .addCase(getLogos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.logos = [];
      });
  },
});

export default logoSlice.reducer;
