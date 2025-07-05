import React from "react";
import { useParams } from "react-router-dom";
import CourseForm from "@/components/instructor/AddCourse/CourseForm";

const CourseFormPage = () => {
  const { courseId } = useParams(); // Optional param
console.log(courseId,"ci");
  return (
   
      <CourseForm courseId={courseId} />

  );
};

export default CourseFormPage;
