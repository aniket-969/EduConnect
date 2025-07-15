import { useAuth } from "@/hooks/useAuth";
import ProfileHeader from "@/components/student/dashboard/profileHeader";
import CourseCard from "@/components/instructor/course/CourseCard";
import { useCoursesByInstructor } from "@/hooks/useCourse";
import { Spinner } from "@/components/ui/spinner";
import CourseSkeleton from "@/components/instructor/common/CourseSkeleton";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import DashboardCarousel from "@/components/instructor/dashboard/DashboardCarousel";
import CarouselBanner from "@/components/student/dashboard/carouselBanner";

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
            >
              See all
            </Link>
          </div>
          <DashboardCarousel courses={draftedCourses} type="draft" />
        </div>
      );
    } else {
      draftedSection = (
          <div className="px-2 mt-4">
            <h3 className="text-lg font-semibold">Drafted Courses</h3>
            <p className="text-sm text-muted-foreground px-2 mt-4">
              You have no drafted courses yet.
            </p>
          </div>
         
      );
    }

    let publishedSection;
    if (isLoading) {
      publishedSection = <CourseSkeleton />;
    } else if (publishedCourses.length > 0) {
      publishedSection = (
        <div>
          <div className="flex items-center justify-between mt-4">
            <h3 className="text-lg font-semibold">Published Courses</h3>
            <Link
              to={paths.app.instructorDashboard.courses.getHref("published")}
              className="text-primary text-sm hover:underline"
            >
              See all
            </Link>
          </div>
          <DashboardCarousel courses={publishedCourses} type="published" />
        </div>
      );
    } else {
      publishedSection = (
      
          <div className="px-2 mt-4">
            <h3 className="text-lg font-semibold">Published Courses</h3>
            <p className="text-sm text-muted-foreground  mt-4">
              You have no published courses yet.
            </p>
          </div>
      
      );
    }

    // Instructor-specific slides for the carousel banner
    const instructorSlides = [
      {
        id: "bedc6aeb-62a6-48d1-a8c3-187c075b1fe4_duwjd3.jpg",
        title: "Share Your Expertise",
        description:
          "Create and publish courses to help learners grow and succeed.",
        ctaLabel: "Create New Course",
        ctaHref: "/app/instructor/courses/new",
      },
      {
        id: "6ddba6b6-3e71-4b0f-a825-d76977d3d6a4_gspjyj.png",
        title: "Track Your Impact",
        description:
          "See how many students are enrolling and learning from your content.",
        ctaLabel: "View Enrollements",
        ctaHref: "/app/instructor/enrolled-students",
      },
    ];

    content = (
      <div className="w-full flex flex-col gap-6 ">
        <ProfileHeader user={session.data} />
        <CarouselBanner slides={instructorSlides} />
        {draftedSection}
        {publishedSection}
      </div>
    );
  }

  return content;
}
