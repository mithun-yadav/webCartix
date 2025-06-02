import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Get username and password from .env
const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Add basic auth to every request
  auth: {
    username,
    password,
  },
});

// Optional request/response logging
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log("🔼 Request:", config);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response);
    return response;
  },
  (error) => {
    console.error("❌ Error:", error);
    return Promise.reject(error);
  }
);

export default api;
