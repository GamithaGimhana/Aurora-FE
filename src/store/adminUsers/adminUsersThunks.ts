import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { AdminUser } from "./adminUsersTypes";
import type { Role } from "../auth/authTypes";

export const fetchAdminUsersThunk = createAsyncThunk<
  AdminUser[],
  void,
  { rejectValue: string }
>("adminUsers/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/admin/users");
    return res.data.users;
  } catch {
    return rejectWithValue("Failed to load users");
  }
});

export const updateUserRoleThunk = createAsyncThunk<
  AdminUser,
  { userId: string; role: Role[] },
  { rejectValue: string }
>("adminUsers/updateRole", async ({ userId, role }, { rejectWithValue }) => {
  try {
    const res = await api.patch(`/admin/users/${userId}/role`, { role });
    return res.data.user;
  } catch {
    return rejectWithValue("Failed to update role");
  }
});

export const deleteUserThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("adminUsers/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await api.delete(`/admin/users/${userId}`);
    return userId;
  } catch {
    return rejectWithValue("Failed to delete user");
  }
});
