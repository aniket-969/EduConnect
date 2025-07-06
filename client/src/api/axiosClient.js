import axios from 'axios';
import { toast } from 'react-toastify';

// Basic API client
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  //withCredentials: true,    //uncommented it for real api
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
