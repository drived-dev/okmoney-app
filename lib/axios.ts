import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import axiosRetry from 'axios-retry';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Adjust based on your API URL
});


// Add request interceptor to inject the token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to log errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default api;
