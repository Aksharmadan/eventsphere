// frontend/src/api.ts
import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: BASE + "/api", // so calls are e.g. /api/auth/login
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// helper to set auth header after login/signup
export function setAuthToken(token?: string) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

export default api;
