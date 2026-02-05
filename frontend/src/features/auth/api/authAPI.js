import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authAPI = {
  // Signup
  signup: (email, password) => {
    return axiosInstance.post('/auth/signup', { email, password });
  },

  // Login
  login: (email, password) => {
    return axiosInstance.post('/auth/login', { email, password });
  },

  // Verify OTP
  verifyOTP: (email, otp) => {
    return axiosInstance.post('/auth/verify-otp', { email, otp });
  },

  // Resend OTP
  resendOTP: (email) => {
    return axiosInstance.post('/auth/resend-otp', { email });
  },

  // Get current user
  getCurrentUser: () => {
    return axiosInstance.get('/auth/me');
  },
};

export default authAPI;