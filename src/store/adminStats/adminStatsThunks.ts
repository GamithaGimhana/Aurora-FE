import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { AdminStats } from "./adminStatsTypes";

export const fetchAdminStatsThunk = createAsyncThunk<
  AdminStats,
  void,
  { rejectValue: string }
>("adminStats/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/admin/stats");
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to load admin stats"
    );
  }
});
