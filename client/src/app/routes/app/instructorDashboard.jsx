import { useAuth } from "@/hooks/useAuth";
import ProfileHeader from "@/components/student/dashboard/profileHeader";
import CourseCard from "@/components/instructor/course/CourseCard";
import { useCoursesByInstructor } from "@/hooks/useCourse";
import { Spinner } from "@/components/ui/spinner";
import CourseSkeleton from "@/components/instructor/common/CourseSkeleton";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import DashboardCarousel from "@/components/instructor/dashboard/DashboardCarousel";

export default function InstructorDashboard() {
  const { session } = useAuth();
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

  let content;
  if (session.isLoading) {
    content = (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  } else if (!session.data) {
    content = <>Not logged in</>;
  } else {
    let draftedSection;
    if (isLoading) {
      draftedSection = <CourseSkeleton />;
    } else if (draftedCourses.length > 0) {
      draftedSection = (
        <div>
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-semibold">Drafted Courses</h3>
            <Link
              to={paths.app.instructorDashboard.courses.getHref("draft")}
              className="text-primary text-sm hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (window.innerWidth < 1024)
                  e.target.removeAttribute("target");
              }}
            >
              See all
            </Link>
          </div>
          <DashboardCarousel courses={draftedCourses} type="draft" />
        </div>
      );
    } else {
      draftedSection = (
        <p className="text-sm text-muted-foreground px-4">
          You have no drafted courses yet.
        </p>
      );
    }

    let publishedSection;
    if (isLoading) {
      publishedSection = <CourseSkeleton />;
    } else if (publishedCourses.length > 0) {
      publishedSection = (
        <div>
          <div className="flex items-center justify-between px-2 mt-4">
            <h3 className="text-lg font-semibold">Published Courses</h3>
            <Link
              to={paths.app.instructorDashboard.courses.getHref("published")}
              className="text-primary text-sm hover:underline"
             
              onClick={(e) => {
                if (window.innerWidth < 1024)
                  e.target.removeAttribute("target");
              }}
            >
              See all
            </Link>
          </div>
          <DashboardCarousel courses={publishedCourses} type="published" />
        </div>
      );
    } else {
      publishedSection = (
        <p className="text-sm text-muted-foreground px-4">
          You have no published courses yet.
        </p>
      );
    }

    content = (
      <div className="w-full flex flex-col gap-6 ">
        <ProfileHeader user={session.data} />
        {draftedSection}
        {publishedSection}
      </div>
    );
  }

  return content;
}
