import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type AuthState, type User } from "./authTypes";
import { loginThunk, getMeThunk, registerThunk } from "./authThunks";

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
      .addCase(loginThunk.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state: AuthState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // GET ME
      .addCase(getMeThunk.pending, (state: AuthState) => {
        state.loading = true;
      })
      .addCase(getMeThunk.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getMeThunk.rejected, (state: AuthState, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = null;
      })

      // REGISTER
      .addCase(registerThunk.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state: AuthState) => {
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state: AuthState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
