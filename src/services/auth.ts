import api from "./api";
import { type Role } from "../store/auth/authTypes"; 

// REGISTER
export const register = async (data: {
  name: string;
  email: string;
  password: string;
  role: Role[];  
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// LOGIN
export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

// GET LOGGED USER
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

// REFRESH TOKENS
export const refreshTokens = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh", { token: refreshToken });
  return res.data;
};
