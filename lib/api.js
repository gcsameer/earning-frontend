// lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://earning-backend-production.up.railway.app/api",
});

export function setTokens(access, refresh) {
  if (typeof window === "undefined") return;

  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
}

export function clearTokens() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  delete api.defaults.headers.common["Authorization"];
}

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access");
}

export default api;
