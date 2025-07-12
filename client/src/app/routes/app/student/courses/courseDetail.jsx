// src/pages/CourseDetail.jsx
import React from 'react'
import { useParams, useNavigate, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'
import { useCourse } from '@/hooks/useCourse'
// import { courseDetailData } from '@/data/courseDetail'  // 

import CourseHero from '@/components/student/courseDetails/courseHero'
import CourseLearningObjectives from '@/components/student/course/courseLearningObjective'
import CourseCurriculum from '@/components/student/course/courseCurriculum'
import CourseReviews from './courseReviews'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data,
    isLoading,
    isError,
    error
  } = useCourse(id)

  if (isLoading) return <Spinner />
  if (isError)   return <p className="text-center text-destructive">Error: {error.message}</p>

  const { course, instructor, enrollment, ratings, lessons } = data

  const enrolled = Boolean(enrollment?.enrolledAt)

  const handleEnroll = async () => {
 navigate(`${course.id}/learn`)
 
  }

  const handleGoToCourse = () => {
    navigate(`${course.id}/learn`)
  }

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

      {/* Curriculum */}
      <CourseCurriculum
        lessons={lessons}
        completedLessonIds={enrollment.completedLessonIds}
        enrolled={enrolled}
        onSelect={(lessonId) =>
          navigate(`${course.id}/learn?lesson=${lessonId}`)
        }
      />

      {/* Reviews */}
      <CourseReviews ratings={ratings} />

    </div>
  )
}
