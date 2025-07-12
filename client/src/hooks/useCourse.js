import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as courseApi from '@/api/queries/course';

export function useCourse(id) {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => courseApi.getCourseById(id),
    enabled: !!id,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseApi.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => courseApi.updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function usePublishCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => courseApi.publishCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course'] });
    },
  });
}

export function useStudentCourses(userId) {
  return useQuery({
    queryKey: ['students', userId, 'courses'],
    queryFn: () => courseApi.fetchStudentCourses(userId),           
    refetchOnWindowFocus: false,
    staleTime: 30 * 60 * 1000,             
    cacheTime: 60 * 60 * 1000,             
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
        'Failed to fetch student courses'
      );
    },
  });
}

export function useRecommendedCourses(userId) {
  return useQuery({
    queryKey: ['students', userId, 'recommendedCourses'],
    queryFn: () => courseApi.fetchRecommendedCourses(userId),             
    refetchOnWindowFocus: false,
    staleTime: 30 * 60 * 1000,              
    cacheTime: 60 * 60 * 1000,            
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
        'Failed to fetch recommended courses'
      );
    },
  });
}