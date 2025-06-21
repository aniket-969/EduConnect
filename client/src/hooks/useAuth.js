import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser, loginUser, logOut as apiLogOut, fetchSession } from '@/api/queries/auth';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Session query
  const sessionQuery = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: fetchSession,
    refetchOnWindowFocus: false,
    staleTime: 30 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to fetch session');
    }
  });

  // Register mutation
  const registerMutation = useMutation(registerUser, {
    onSuccess: (data) => {
      toast.success('Registration successful!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong, please refresh');
      console.error('Registration failed:', error);
    },
  });

  // Login mutation
  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      // Optionally persist in localStorage
      localStorage.setItem('session', JSON.stringify(data));
      // Directly set query data to avoid refetch
      queryClient.setQueryData(['auth', 'session'], data);
      toast.success('Login successful!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Invalid credentials, please try again');
      console.error('Login error:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation(apiLogOut, {
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'session'], null);
      localStorage.removeItem('session');
      toast.success('Logged out successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Logout failed');
      console.error('Logout error:', error);
    },
  });

  return {
    session: sessionQuery,
    register: registerMutation,
    login: loginMutation,
    logout: logoutMutation,
  };
};
