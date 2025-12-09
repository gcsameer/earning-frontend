// frontend/lib/api.js
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Axios instance for all API calls
const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Attach token on first load (browser only)
if (typeof window !== "undefined") {
  const token = localStorage.getItem("accessToken");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

// Save tokens after login / refresh
export function setTokens(access, refresh) {
  if (typeof window === "undefined") return;

  if (access) {
    localStorage.setItem("accessToken", access);
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  }
  if (refresh) {
    localStorage.setItem("refreshToken", refresh);
  }
}

// Clear tokens on logout
export function clearTokens() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
  delete api.defaults.headers.common["Authorization"];
}

// Helper to read token
export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export default api;
