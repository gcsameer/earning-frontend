// frontend/lib/api.js
import axios from "axios";

const RAW_BASE = process.env.NEXT_PUBLIC_API_URL || "";
// Ensure no trailing slash, then add /api
const API_BASE = RAW_BASE.replace(/\/$/, "") + "/api";

const api = axios.create({
  baseURL: API_BASE,
  // we use JWT in headers, no cookies needed
  withCredentials: false,
});

// Store tokens in localStorage
export function setTokens(access, refresh) {
  if (typeof window === "undefined") return;
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
}

// Attach Authorization header automatically
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
