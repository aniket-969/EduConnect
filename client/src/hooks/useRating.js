import * as ratingApi from "@/api/queries/rating";
import { useQuery } from "@tanstack/react-query";


export function useCourseRatings(courseId) {
  return useQuery({
    queryKey: ["courseRatings", courseId],
    queryFn: () => ratingApi.getRatingsByCourseId(courseId),
    enabled: !!courseId,
  });
}
