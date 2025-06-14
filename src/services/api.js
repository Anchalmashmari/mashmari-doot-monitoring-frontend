// src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1'; // Replace with prod URL when deploying

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for future token handling (optional but scalable)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
