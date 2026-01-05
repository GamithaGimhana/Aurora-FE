import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { ProfileUser } from "./profileTypes";

// FETCH PROFILE
export const fetchProfileThunk = createAsyncThunk<
  ProfileUser,
  void,
  { rejectValue: string }
>("profile/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/users/me");
    return res.data.data;
  } catch {
    return rejectWithValue("Failed to fetch profile");
  }
});

// UPDATE PROFILE
export const updateProfileThunk = createAsyncThunk<
  ProfileUser,
  { name?: string; email?: string },
  { rejectValue: string }
>("profile/update", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.put("/users/me", payload);
    return res.data.data;
  } catch {
    return rejectWithValue("Failed to update profile");
  }
});

// CHANGE PASSWORD
export const changePasswordThunk = createAsyncThunk<
  void,
  { currentPassword: string; newPassword: string },
  { rejectValue: string }
>("profile/changePassword", async (payload, { rejectWithValue }) => {
  try {
    await api.put("/users/me/password", payload);
  } catch {
    return rejectWithValue("Failed to change password");
  }
});
