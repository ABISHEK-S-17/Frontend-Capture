import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";  // axios instance

// ========== Get All Testimonials ==========
export const getTestimonials = createAsyncThunk(
  "testimonial/getTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/testimonials");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching testimonials");
    }
  }
);

// ========== Create Testimonial ==========
export const createTestimonial = createAsyncThunk(
  "testimonial/createTestimonial",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/testimonial/createTestimonial", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating testimonial");
    }
  }
);

// ========== Update Testimonial ==========
export const updateTestimonial = createAsyncThunk(
  "testimonial/updateTestimonial",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.put("/admin/testimonial/updateTestimonial", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating testimonial");
    }
  }
);

// ========== Delete Testimonial ==========
export const deleteTestimonial = createAsyncThunk(
  "testimonial/deleteTestimonial",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.put("/admin/testimonial/deleteTestimonial", { id });
      return id; // remove from UI list
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error deleting testimonial");
    }
  }
);


// ================= SLICE ==================

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    testimonials: [],
    loading: false,
    error: null,
  },

  reducers: {
    resetTestimonialState: (state) => {
      state.testimonials = [];
      state.loading = false;
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder

      // Get Testimonials
      .addCase(getTestimonials.pending, (state) => { state.loading = true; })
      .addCase(getTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(getTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Testimonial
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.testimonials.push(action.payload);
      })

      // Update Testimonial
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.map(t =>
          t.id === action.payload.id ? action.payload : t
        );
      })

      // Delete Testimonial
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.filter(t => t.id !== action.payload);
      });
  },
});

export const { resetTestimonialState } = testimonialSlice.actions;
export default testimonialSlice.reducer;
