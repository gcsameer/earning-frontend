import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ---------- token helpers ----------
export function setTokens(access, refresh) {
  if (typeof window === "undefined") return;
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
}

// ---------- axios instance ----------
const api = axios.create({
  baseURL: API_URL,
});

// Attach access token on every request
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-refresh access token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // no retry or endpoint not auth -> just fail
    if (!original || original._retry) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      const refresh = getRefreshToken();
      if (!refresh) {
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      original._retry = true;
      try {
        const res = await axios.post(`${API_URL}/auth/token/refresh/`, {
          refresh,
        });
        const newAccess = res.data.access;
        setTokens(newAccess, refresh);
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (err) {
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
