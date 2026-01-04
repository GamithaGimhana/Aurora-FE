import { createSlice } from "@reduxjs/toolkit";
import type { AdminUsersState } from "./adminUsersTypes";
import {
  deleteUserThunk,
  fetchAdminUsersThunk,
  updateUserRoleThunk,
} from "./adminUsersThunks";

const initialState: AdminUsersState = {
  users: [],
  loading: false,
  error: null,
};

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH USERS
      .addCase(fetchAdminUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAdminUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading users";
      })

      // UPDATE ROLE
      .addCase(updateUserRoleThunk.fulfilled, (state, action) => {
        const idx = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (idx !== -1) {
          state.users[idx] = action.payload;
        }
      })

      // DELETE USER
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (u) => u._id !== action.payload
        );
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete user";
      });
  },
});

export default adminUsersSlice.reducer;
