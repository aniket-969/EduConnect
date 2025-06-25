import { useQuery } from "@tanstack/react-query";
import { getInstructorDashboardStats } from "@/api/queries/instructor";

export const useInstructorStats = () => {
  return useQuery({
    queryKey: ["instructor", "stats"],
    queryFn: getInstructorDashboardStats,
  });
};