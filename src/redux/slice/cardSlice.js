import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ========== Get All Cards ==========
export const getCards = createAsyncThunk(
  "card/getCards",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/cards");
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch cards");
    }
  }
);

// ========== Create Card ==========
export const createCard = createAsyncThunk(
  "card/createCard",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/card/createCard", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create card");
    }
  }
);

// ========== Update Card ==========
export const updateCard = createAsyncThunk(
  "card/updateCard",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/admin/card/updateCard?id=${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// ========== Delete Card ==========
export const deleteCard = createAsyncThunk(
  "card/deleteCard",
  async (id, { rejectWithValue }) => {
    try {
      await api.put(`/admin/card/deleteCard?id=${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// ================= SLICE =================
const cardSlice = createSlice({
  name: "card",
  initialState: {
    cards: [],
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    resetCardState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      // READ
      .addCase(getCards.pending, (state) => { state.loading = true; })
      .addCase(getCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createCard.pending, (state) => { state.loading = true; })
      .addCase(createCard.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateCard.pending, (state) => { state.loading = true; })
      .addCase(updateCard.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteCard.pending, (state) => { state.loading = true; })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = state.cards.filter(c => c.id !== action.payload);
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetCardState } = cardSlice.actions;
export default cardSlice.reducer;
