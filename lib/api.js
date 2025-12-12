// lib/api.js
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const STORAGE_KEY = "nepearn_tokens";

/**
 * Read tokens from localStorage
 */
export function getTokens() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed to parse tokens from storage", e);
    return null;
  }
}

/**
 * Save tokens to localStorage
 * expects: { access: "...", refresh: "..." }
 */
export function setTokens(tokens) {
  if (typeof window === "undefined") return;

  const data = {
    access: tokens?.access || null,
    refresh: tokens?.refresh || null,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Remove all tokens (used on logout / 401)
 */
export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Helper for Authorization header
 */
export function getAccessToken() {
  const tokens = getTokens();
  return tokens?.access || null;
}

// Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Attach Authorization header automatically
api.interceptors.request.use(
  (config) => {
    const access = getAccessToken();
    if (access) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
