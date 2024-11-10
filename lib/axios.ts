import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://192.168.1.62:3000/api" , // Adjust based on your API URL
});


// Add request interceptor to inject the token
api.interceptors.request.use(async (config) => {  
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to log errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default api;