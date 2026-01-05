import { createSlice } from "@reduxjs/toolkit";
import type { AdminStatsState } from "./adminStatsTypes";
import { fetchAdminStatsThunk } from "./adminStatsThunks";

const initialState: AdminStatsState = {
  stats: null,
  loading: false,
  error: null,
};

const adminStatsSlice = createSlice({
  name: "adminStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load stats";
      });
  },
});

export default adminStatsSlice.reducer;
