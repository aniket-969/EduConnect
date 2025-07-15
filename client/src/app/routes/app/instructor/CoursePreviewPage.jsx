import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourse } from "@/hooks/useCourse";
import { useCourseRatings } from "@/hooks/useRating";
import CoursePreviewHero from "@/components/instructor/preview/CoursePreviewHero";
import CourseLearningObjectives from "@/components/student/course/courseLearningObjective";
import CoursePreviewCurriculum from "@/components/instructor/preview/CoursePreviewCurriculum";
import { Pencil } from "lucide-react";
import { paths } from "@/config/paths";
import DeleteCourseButton from "@/components/instructor/common/DeleteCourseButton";
import CourseReviews from "../student/courses/courseReviews";

export default function InstructorCoursePreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading } = useCourse(id);
  
  const { data: ratings, isLoading: ratingsLoading } = useCourseRatings(
    course && course.status === "PUBLISHED" ? id : null
  );

  const handleEdit = () => {
    navigate(paths.app.instructorDashboard.editcourses.getHref(id));
  };

  if (isLoading) return <div>Loading...</div>;
  if (!course) return <div>No course found.</div>;

  return (
    <div className="w-full px-4 space-y-8 ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold capitalize">Course Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="w-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <DeleteCourseButton
            courseId={id}
            onDeleted={() =>
              navigate(paths.app.instructorDashboard.courses.getHref())
            }
            buttonClassName="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 transition"
            iconOnly={false}
            stopPropagation={false}
          />
        </div>
      </div>

      <CoursePreviewHero course={course} />

      <CourseLearningObjectives
        objectives={course.learningObjectives}
        title="Learning Objectives"
      />
      <CoursePreviewCurriculum lessons={course.lessons} />
      {/* Add ratings/reviews section here if needed */}
      {course.status === "PUBLISHED" &&
        (ratingsLoading ? (
          <div>Loading reviews...</div>
        ) : (
          <CourseReviews ratings={ratings} />
        ))}
    </div>
  );
}
