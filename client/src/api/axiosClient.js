import axios from 'axios';
import { toast } from 'react-toastify';

// Basic API client
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('eduToken');
    
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // const status = error.response?.status;
    // const url = error.config?.url;

    // // ✅ Suppress toast for 404 on fetching instructor courses in dashbord as new instructor will not have any courses
    // if (status === 404 && url?.includes("/instructor")) {
    //   return Promise.reject(error); // silently reject (no toast)
    // }
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
