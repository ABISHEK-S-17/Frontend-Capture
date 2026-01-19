import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

// ================== GET CONTACTS (ADMIN) ==================
export const getContacts = createAsyncThunk(
  "contact/getContacts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/admin/contact/getContacts`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Get Contacts Failed");
    }
  }
);

// ================== CREATE CONTACT (PUBLIC) ==================
export const createContact = createAsyncThunk(
  "contact/createContact",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/user/createContact`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Create Contact Failed");
    }
  }
);

// ================== UPDATE CONTACT ==================
export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/admin/contact/updateContact`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update Failed");
    }
  }
);

// ================== DELETE CONTACT ==================
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/admin/contact/deleteContact`, { id });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete Failed");
    }
  }
);

// ================== SLICE ==================
const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => { state.loading = true; })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.data || [];
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload.data);
      })

      .addCase(updateContact.fulfilled, (state, action) => {
        const updated = action.payload.data;
        const index = state.contacts.findIndex(c => c.id === updated.id);
        if (index !== -1) state.contacts[index] = updated;
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.contacts = state.contacts.filter(c => c.id !== id);
      });
  }
});

export default contactSlice.reducer;
