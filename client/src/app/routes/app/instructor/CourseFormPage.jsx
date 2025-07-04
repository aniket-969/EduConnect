import React from "react";
import { useParams } from "react-router-dom";
import CourseForm from "@/components/instructor/AddCourse/CourseForm";

const CourseFormPage = () => {
  const { courseId } = useParams(); // courseId is undefined for "add" mode

  return (
    <div className="p-2">
      <CourseForm courseId={courseId} />
    </div>
  );
};

export default CourseFormPage;
