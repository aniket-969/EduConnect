import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCourse } from "@/hooks/useCourse";
import CoursePreview from "@/components/instructor/course/CoursePreview";

export default function InstructorCoursePreviewPage() {
  const { id } = useParams();
  const { data: course, isLoading } = useCourse(id);
  console.log(course, "data");

  if (isLoading) return <div>Loading...</div>;
  return <CoursePreview course={course} />;
}
