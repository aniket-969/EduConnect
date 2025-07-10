import { useAuth } from "@/hooks/useAuth";
//import ProfileHeader from "@/components/student/dashboard/profileHeader";
import DraftedCoursesCarousel from "@/components/instructor/dashboard/DraftedCourses";
import PublishedCoursesCarousel from "@/components/instructor/dashboard/PublishedCourse";
import { useCoursesByInstructor } from "@/hooks/useCourse";
import { Spinner } from "@/components/ui/spinner";
import CourseSkeleton from "@/components/instructor/common/CourseSkeleton";
export default function InstructorDashboard() {
  const { session } = useAuth();
  console.log("data",session.data);
  const instructorId = session.data?.id;

  const { data: courses = [], isLoading } =
    useCoursesByInstructor(instructorId);

const getCoursesByStatus = (status) =>
  courses
    .filter((course) => course.status === status)
    .sort((a, b) => {
      const key = status === "DRAFT" ? "updatedAt" : "publishedOn";
      return new Date(b[key]) - new Date(a[key]);
    });

const draftedCourses = getCoursesByStatus("DRAFT");
const publishedCourses = getCoursesByStatus("PUBLISHED");


  if (session.isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );

  if (!session.data) return <>Not logged in</>;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* <ProfileHeader user={session.data} /> */}
      {isLoading ? (
        <CourseSkeleton />
      ) : draftedCourses.length > 0 ? (
        <DraftedCoursesCarousel courses={draftedCourses} />
      ) : (
        <p className="text-sm text-muted-foreground px-4">
          You have no drafted courses yet.
        </p>
      )}

      {isLoading ? (
        <CourseSkeleton />
      ) : publishedCourses.length > 0 ? (
        <PublishedCoursesCarousel courses={publishedCourses} />
      ) : (
        <p className="text-sm text-muted-foreground px-4">
         You have no published courses yet.
        </p>
      )}

 
      
    </div>
  );
}
