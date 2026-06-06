import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5095/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding authorization tokens
api.interceptors.request.use(
  (config) => {
    // TODO: Implement logic to retrieve and add auth token
    const authToken = localStorage.getItem('authToken'); // Example
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;