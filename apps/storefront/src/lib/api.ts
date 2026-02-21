import axios from 'axios';

// Create an Axios instance pointing to the API Gateway
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Request interceptor to add the auth token header to requests
api.interceptors.request.use(
  (config) => {
    // We only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
