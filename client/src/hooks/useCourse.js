import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as courseApi from "@/api/queries/course";

export function useCourse(id, instructorId) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => courseApi.getCourseById(id),
    enabled: !!id,
  });
}

//get course by instructor id
export function useCoursesByInstructor(instructorId) {
  return useQuery({
    queryKey: ["courses", "instructor", instructorId],
    queryFn: () => courseApi.getCoursesByInstructor(instructorId),
    enabled: !!instructorId,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseApi.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => courseApi.updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

//uncomment it for real api and comment below

export function usePublishCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => courseApi.publishCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
  });
}

// export function usePublishCourse() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, data }) => courseApi.publishCourse(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["courses"] });
//       queryClient.invalidateQueries({ queryKey: ["course"] });
//     },
//   });
// }



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

export function useCourseCatalog({
  search = '',
  category = 'All',
  level = 'All',
  sortBy = 'newest',
  page = 1,
  size = 10,
}) {
  return useQuery({
    queryKey: ['courseCatalog', { search, category, level, sortBy, page, size }],
    queryFn: () =>
      courseApi.fetchCourseCatalog({ search, category, level, sortBy, page, size }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
        'Failed to load courses'
      )
    },
  })
}

