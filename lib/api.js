import axios from "axios";

// IMPORTANT:
// In Vercel set NEXT_PUBLIC_API_BASE_URL = https://earning-backend-production.up.railway.app
// (no /api at the end)
const RAW_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://earning-backend-production.up.railway.app";

// always make baseURL end with /api
const API_BASE_URL = RAW_BASE.endsWith("/api") ? RAW_BASE : `${RAW_BASE}/api`;

const ACCESS_KEY = "nepearn_access";
const REFRESH_KEY = "nepearn_refresh";

export const setTokens = (access, refresh) => {
  if (typeof window === "undefined") return;
  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
};

export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
};

export const getRefreshToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
};

export const clearTokens = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// -----------------------------
// REQUEST: attach access token
// -----------------------------
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// -----------------------------
// RESPONSE: auto refresh token
// -----------------------------
let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  refreshQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // If no response or not 401, just throw
    if (!error.response || error.response.status !== 401) {
      throw error;
    }

    // Prevent infinite loop
    if (original._retry) {
      clearTokens();
      throw error;
    }

    const refresh = getRefreshToken();
    if (!refresh) {
      clearTokens();
      throw error;
    }

    // If already refreshing, queue requests
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((newToken) => {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      // Use a plain axios instance so we don't recurse into interceptors
      const refreshRes = await axios.post(
        `${API_BASE_URL}/auth/token/refresh/`,
        { refresh },
        { headers: { "Content-Type": "application/json" } }
      );

      const newAccess = refreshRes.data.access;
      setTokens(newAccess, refresh);

      processQueue(null, newAccess);

      original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
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
