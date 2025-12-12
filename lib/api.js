// lib/api.js
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://earning-backend-production.up.railway.app/api";

// Keys used in localStorage
const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

const api = axios.create({
  baseURL: API_URL,
});

// -------- Token helpers --------
export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(access, refresh) {
  if (typeof window === "undefined") return;
  if (access) {
    localStorage.setItem(ACCESS_KEY, access);
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  }
  if (refresh) {
    localStorage.setItem(REFRESH_KEY, refresh);
  }
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  delete api.defaults.headers.common["Authorization"];
}

// On first load in the browser, attach token from storage
function applyTokenFromStorage() {
  if (typeof window === "undefined") return;
  const token = localStorage.getItem(ACCESS_KEY);
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

if (typeof window !== "undefined") {
  applyTokenFromStorage();
}

// -------- 401 → refresh token interceptor (optional but nice) --------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // If 401 and we haven't retried yet, try refresh
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = getRefreshToken();

      if (refresh) {
        try {
          const res = await axios.post(`${API_URL}/auth/token/refresh/`, {
            refresh,
          });

          const newAccess = res.data.access;
          setTokens(newAccess, refresh);

          original.headers = {
            ...original.headers,
            Authorization: `Bearer ${newAccess}`,
          };

          return api(original);
        } catch (refreshErr) {
          clearTokens();
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
