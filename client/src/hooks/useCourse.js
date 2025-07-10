import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as courseApi from "@/api/queries/course";

export function useCourse(id) {
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
