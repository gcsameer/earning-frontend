import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://earning-backend-production.up.railway.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== TOKEN HELPERS =====
export const setTokens = (access, refresh) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("nepearn_access", access);
    localStorage.setItem("nepearn_refresh", refresh);
  }
};

export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("nepearn_access");
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("nepearn_access");
    localStorage.removeItem("nepearn_refresh");
  }
};

// ===== ATTACH TOKEN TO EVERY REQUEST =====
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
