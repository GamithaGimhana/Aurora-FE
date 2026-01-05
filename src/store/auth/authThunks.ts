import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../services/auth";
import { type Role, type User } from "./authTypes";

export const loginThunk = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await authApi.login(payload.email, payload.password);

    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    localStorage.setItem("user", JSON.stringify(res.user));

    return res.user;
  } catch {
    return rejectWithValue("Invalid email or password");
  }
});

export const getMeThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/getMe", async (_, { rejectWithValue }) => {
  try {
    const res = await authApi.getMe();
    localStorage.setItem("user", JSON.stringify(res.user));
    return res.user;
  } catch {
    localStorage.clear();
    return rejectWithValue("Session expired");
  }
});

export const registerThunk = createAsyncThunk<
  void,
  {
    name: string;
    email: string;
    password: string;
    role: Role[];
  },
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    await authApi.register(payload);
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Registration failed"
    );
  }
});
