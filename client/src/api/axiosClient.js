import Axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { env } from '@/config/env';

// Basic API client 
export const api = Axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error) => Promise.reject(error)
);

// Response interceptor: unwrap data and show toast on error
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: any) => {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
