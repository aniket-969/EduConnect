import { useQuery } from "@tanstack/react-query";
import { getInstructorCourses } from "@/api/queries/instructor";

export const useInstructorCourses = () =>
  useQuery({
    queryKey: ["instructor-courses"],
    queryFn: getInstructorCourses,
  });
