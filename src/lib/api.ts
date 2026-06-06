import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5095/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for future authentication tokens
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('authToken'); // Example: Retrieve token from localStorage
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;