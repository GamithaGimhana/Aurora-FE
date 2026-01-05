import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileState, ProfileUser } from "./profileTypes";
import {
  fetchProfileThunk,
  updateProfileThunk,
  changePasswordThunk,
} from "./profileThunks";

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH PROFILE
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProfileThunk.fulfilled,
        (state, action: PayloadAction<ProfileUser>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      })

      // UPDATE PROFILE
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProfileThunk.fulfilled,
        (state, action: PayloadAction<ProfileUser>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update profile";
      })

      // CHANGE PASSWORD
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // 🔁 force re-login
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to change password";
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
