import { useInstructorCourses } from "@/hooks/useInstructorCourses";
import MyCoursesTable from "@/components/instructor/MyCoursesTable";

export default function MyCoursesPage() {
  const { data, isLoading } = useInstructorCourses();

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="w-full p-2">
      <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
      <MyCoursesTable data={data} />
    </div>
  );
}
