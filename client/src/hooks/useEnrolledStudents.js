import { useQuery } from "@tanstack/react-query";
import { getEnrolledStudents } from "@/api/queries/instructor";

export const useEnrolledStudents = () => {
  return useQuery({
    queryKey: ["instructor", "enrolled-students"],
    queryFn: getEnrolledStudents,
  });
};
