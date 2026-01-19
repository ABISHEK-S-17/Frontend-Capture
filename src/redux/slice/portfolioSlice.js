import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ================= GET Portfolios =================
export const getPortfolios = createAsyncThunk(
  "portfolio/getPortfolios",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/portfolios");
      return res.data.data || [];    // backend must return data array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load portfolio");
    }
  }
);

// ================= CREATE Portfolio =================
export const createPortfolio = createAsyncThunk(
  "portfolio/createPortfolio",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/portfolio/createPortfolio", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create portfolio");
    }
  }
);

// ================= UPDATE Portfolio =================
export const updatePortfolio = createAsyncThunk(
  "portfolio/updatePortfolio",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/admin/portfolio/updatePortfolio?id=${id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update portfolio");
    }
  }
);

// ================= DELETE Portfolio =================
export const deletePortfolio = createAsyncThunk(
  "portfolio/deletePortfolio",
  async (id, { rejectWithValue }) => {
    try {
      await api.put(`/admin/portfolio/deletePortfolio?id=${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete portfolio");
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    portfolios: [],
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    resetPortfolioState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },

  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getPortfolios.pending, (state) => { state.loading = true; })
      .addCase(getPortfolios.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios = action.payload;
      })
      .addCase(getPortfolios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createPortfolio.pending, (state) => { state.loading = true; })
      .addCase(createPortfolio.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updatePortfolio.pending, (state) => { state.loading = true; })
      .addCase(updatePortfolio.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deletePortfolio.pending, (state) => { state.loading = true; })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios = state.portfolios.filter(p => p.id !== action.payload);
      })
      .addCase(deletePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetPortfolioState } = portfolioSlice.actions;
export default portfolioSlice.reducer;
