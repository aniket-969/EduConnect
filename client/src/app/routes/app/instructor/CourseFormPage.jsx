import React from "react";
import { useParams } from "react-router-dom";
import CourseForm from "@/components/instructor/AddCourse/CourseForm";

const CourseFormPage = () => {
  const { courseId } = useParams();
  console.log("CourseFormPage loaded with ID:", courseId);

  return (
    <div className="p-4">
      <CourseForm courseId={courseId} />
    </div>
  );
};

export default CourseFormPage;
