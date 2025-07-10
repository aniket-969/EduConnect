
import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import CourseHero from '@/components/student/courseDetails/courseHero';
import CourseLearningObjectives from '@/components/student/course/courseLearningObjective';
import { courseDetailData } from '@/data/courseDetail';
import CourseCurriculum from '@/components/student/course/courseCurriculum';
import CourseReviews from './courseReviews';

export default function CourseDetail() {
  const navigate = useNavigate();
  const { course, instructor, enrollment,ratings } = courseDetailData;
  const enrolled = Boolean(enrollment.enrolledAt);

  const handleEnroll = async () => {
    // TODO: call your enroll API then update state
    console.log('Enroll clicked for course', course.id);
  };

  const handleGoToCourse = () => {
    navigate(`${course.id}/learn`);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Banner & Hero */}
      <CourseHero
        thumbnailUrl={course.thumbnailUrl}
        title={course.title}
        category={course.category}
        instructor={instructor}
        enrolled={enrolled}
        price={course.price}
        currency={course.currency}
        onEnroll={handleEnroll}
        onGoToCourse={handleGoToCourse}
      />

      {/* Learning Objectives */}
      <CourseLearningObjectives objectives={course.learningObjectives} />
<CourseCurriculum
  lessons={courseDetailData.lessons}
  completedLessonIds={enrollment.completedLessonIds}
  enrolled={enrolled}
  onSelect={(lessonId) => navigate(`${course.id}/learn?lesson=${lessonId}`)}
/>
   <CourseReviews ratings={ratings} />
    </div>
  );
}
