import { useInstructorStats } from "@/hooks/useInstructorStats";
import { Star, BookOpen, Users } from "lucide-react";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-muted/50 shadow-md hover:shadow-xl transition rounded-2xl  p-4 flex items-center gap-4 ">
    <Icon className="text-primary w-8 h-8" />
    <div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
  </div>
);

export default function InstructorDashboard() {
  const { data, isLoading } = useInstructorStats();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
      <StatCard icon={BookOpen} label="Total Courses" value={data.totalCourses} />
      <StatCard icon={Users} label="Total Enrollments" value={data.totalEnrollments} />
      <StatCard icon={Star} label="Average Rating" value={data.averageRating.toFixed(1)} />
    </div>
  );
}
