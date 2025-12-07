import axios, { AxiosError } from "axios";
import { refreshTokens } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const PUBLIC_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  const isPublic = PUBLIC_ENDPOINTS.some((url) =>
    config.url?.includes(url)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as any;

    const isPublic = PUBLIC_ENDPOINTS.some((url) =>
      original.url?.includes(url)
    );

    if (error.response?.status === 401 && !isPublic && !original._retry) {
      original._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await refreshTokens(refreshToken!);

        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        
        original.headers.Authorization = `Bearer ${res.accessToken}`; 
        return axios(original);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
