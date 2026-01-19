import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api"; // Axios instance

// ================= Thunks =================

// GET all prices
export const getPrices = createAsyncThunk("price/getPrices", async () => {
  const response = await api.get("/user/prices");
  return response.data.data;
});

// CREATE price
export const createPrice = createAsyncThunk("price/createPrice", async (formData) => {
  const response = await api.post("/admin/price/createPrice", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data.data;
});

// UPDATE price
export const updatePrice = createAsyncThunk("price/updatePrice", async (formData) => {
  const response = await api.put("/admin/price/updatePrice", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data.data;
});

// DELETE price
export const deletePrice = createAsyncThunk("price/deletePrice", async (id) => {
  const response = await api.put("/admin/price/deletePrice", { id });
  return id;
});

// ================= Slice =================

const priceSlice = createSlice({
  name: "price",
  initialState: {
    prices: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ------- GET -------
      .addCase(getPrices.pending, (state) => { state.loading = true })
      .addCase(getPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload;
      })
      .addCase(getPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ------- CREATE -------
      .addCase(createPrice.fulfilled, (state, action) => {
        state.prices.push(action.payload);
      })

      // ------- UPDATE -------
      .addCase(updatePrice.fulfilled, (state, action) => {
        const index = state.prices.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.prices[index] = action.payload;
      })

      // ------- DELETE -------
      .addCase(deletePrice.fulfilled, (state, action) => {
        state.prices = state.prices.filter(p => p.id !== action.payload);
      });
  }
});

export default priceSlice.reducer;
