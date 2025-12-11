// frontend/lib/api.js
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000/api"; // for local dev

const api = axios.create({
  baseURL: API_URL,
});

export function setTokens(access, refresh) {
  if (typeof window === "undefined") return;
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access");
}

// attach token if present
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
