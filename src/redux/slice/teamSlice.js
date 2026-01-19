import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ================= GET Teams =================
export const getTeams = createAsyncThunk(
  "team/getTeams",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/teams");
      return res.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load teams");
    }
  }
);

// ================= CREATE Team =================
export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/team/createTeam", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create team");
    }
  }
);

// ================= UPDATE Team =================
export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/admin/team/updateTeam?id=${id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update team");
    }
  }
);

// ================= DELETE Team =================
export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async (id, { rejectWithValue }) => {
    try {
      await api.put(`/admin/team/deleteTeam?id=${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete team");
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [],
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    resetTeamState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },

  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getTeams.pending, (state) => { state.loading = true; })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createTeam.pending, (state) => { state.loading = true; })
      .addCase(createTeam.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateTeam.pending, (state) => { state.loading = true; })
      .addCase(updateTeam.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteTeam.pending, (state) => { state.loading = true; })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = state.teams.filter(t => t.id !== action.payload);
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetTeamState } = teamSlice.actions;
export default teamSlice.reducer;
