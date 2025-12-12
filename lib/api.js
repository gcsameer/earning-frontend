import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? "https://earning-backend-production.up.railway.app/api"
    : "http://127.0.0.1:8000/api");

const ACCESS_KEY = "nepearn_access";
const REFRESH_KEY = "nepearn_refresh";

export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
};

export const getRefreshToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
};

export const setTokens = (access, refresh) => {
  if (typeof window === "undefined") return;
  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
};

export const clearTokens = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

// Main API client
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// A separate client for refresh (no interceptors to avoid loops)
const refreshClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token on every request
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Refresh token once on 401 and retry
let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  refreshQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // If no response or not 401 -> throw
    if (!error.response || error.response.status !== 401) {
      throw error;
    }

    // Prevent infinite retry
    if (originalRequest._retry) {
      clearTokens();
      throw error;
    }

    const refresh = getRefreshToken();
    if (!refresh) {
      clearTokens();
      throw error;
    }

    if (isRefreshing) {
      // wait for refresh then retry
      const newToken = await new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      });
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      originalRequest._retry = true;
      return api(originalRequest);
    }

    isRefreshing = true;
    originalRequest._retry = true;

    try {
      const resp = await refreshClient.post("/auth/token/refresh/", {
        refresh,
      });

      const newAccess = resp.data.access;
      setTokens(newAccess, refresh);
      processQueue(null, newAccess);

      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      clearTokens();
      throw err;
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
