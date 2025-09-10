// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000'
});

// helper to set/clear token quickly
export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('es_token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('es_token');
  }
}

// on startup load token if present
const saved = localStorage.getItem('es_token');
if (saved) {
  api.defaults.headers.common['Authorization'] = `Bearer ${saved}`;
}

export default api;
