import { createSlice } from "@reduxjs/toolkit";
import { type AuthState } from "./authTypes";
import { loginThunk, getMeThunk } from "./authThunks";

const initialState: AuthState = {
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // GET ME
      .addCase(getMeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getMeThunk.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
