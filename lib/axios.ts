import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { safeNavigate } from "./navigation-utils";

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
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Track failed authentication attempts
let authErrorCount = 0;
const MAX_AUTH_RETRIES = 3;

// Add response interceptor to handle errors and authentication
api.interceptors.response.use(
  (response) => {
    // Reset counter on successful response
    if (authErrorCount > 0) {
      authErrorCount = 0;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log the error
    console.log("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      authErrorCount++;

      if (authErrorCount >= MAX_AUTH_RETRIES) {
        // Clear stored tokens and redirect to login
        await AsyncStorage.removeItem("token");
        await SecureStore.deleteItemAsync("refreshToken");
        authErrorCount = 0; // Reset counter

        // Redirect to login screen with error handling
        try {
          await safeNavigate.replace("/(auth)/login");
        } catch (navigationError) {
          console.error("Navigation error during logout:", navigationError);
          // Fallback: try to navigate to root
          try {
            await safeNavigate.push("/(auth)/login");
          } catch (fallbackError) {
            console.error("Fallback navigation failed:", fallbackError);
          }
        }

        // Show alert to user (you might want to use your app's alert system)
        if (typeof window !== "undefined") {
          alert("Your session has expired. Please log in again.");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
