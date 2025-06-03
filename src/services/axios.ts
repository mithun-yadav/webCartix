import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Get username and password from .env
const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;

const axiosInstance: AxiosInstance = axios.create({
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
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
