import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ============ GET About (PUBLIC) ============
export const getAbouts = createAsyncThunk(
  "about/getAbouts",
  async (_, { rejectWithValue }) => {
    try {
      
      const res = await api.get("/user/abouts");
      return res.data.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load About data"
      );
    }
  }
);

// ============ CREATE (ADMIN) ============
export const createAbout = createAsyncThunk(
  "about/createAbout",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/about/createAbout", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create About"
      );
    }
  }
);

// ============ UPDATE (ADMIN) ============
export const updateAbout = createAsyncThunk(
  "about/updateAbout",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/admin/about/updateAbout/${id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update About"
      );
    }
  }
);

// ============ DELETE (ADMIN) ============
export const deleteAbout = createAsyncThunk(
  "about/deleteAbout",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`/admin/about/deleteAbout/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete About"
      );
    }
  }
);

// ================= SLICE =================
const aboutSlice = createSlice({
  name: "about",
  initialState: {
    about: [],
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    resetAboutState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getAbouts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAbouts.fulfilled, (state, action) => {
        state.loading = false;
        state.about = action.payload;
      })
      .addCase(getAbouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAbout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAbout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.about = state.about.filter(
          (a) => a.id !== action.payload
        );
      })
      .addCase(deleteAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAboutState } = aboutSlice.actions;
export default aboutSlice.reducer;
