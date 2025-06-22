import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  registerUser,
  loginUser,
  logOut as apiLogOut,
  fetchSession,
} from '@/api/queries/auth';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // — Session
  const sessionQuery = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: fetchSession,
    refetchOnWindowFocus: false,
    staleTime: 30 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to fetch session');
    },
  });

  // — Register
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Registration successful!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Something went wrong');
      console.error('Registration failed:', err);
    },
  });

  // — Login
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('session', JSON.stringify(data));
      queryClient.setQueryData(['auth', 'session'], data);
      toast.success('Login successful!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Invalid credentials');
      console.error('Login error:', err);
    },
  });

  // — Logout
  const logoutMutation = useMutation({
    mutationFn: apiLogOut,
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'session'], null);
      localStorage.removeItem('session');
      toast.success('Logged out successfully');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Logout failed');
      console.error('Logout error:', err);
    },
  });

  return {
    session: sessionQuery,
    register: registerMutation,
    login: loginMutation,
    logout: logoutMutation,
  };
};
