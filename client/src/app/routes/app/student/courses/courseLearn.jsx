// src/pages/CourseLearn.jsx
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'
import { useCourse, useLessonsByCourse, useLesson } from '@/hooks/useLessons' // assume you also export useCourse here
import LessonContent from '@/components/student/courseLessons/LessonContent'
import CourseContentPanel from '@/components/student/courseLessons/CourseContentPanel'
import OverviewPanel from '@/components/student/courseLessons/OverviewPanel'
import ResponsiveTabs from '@/components/student/courseLessons/ResponsiveTabs'

export default function CourseLearn() {
  const { id: courseId } = useParams()

  const {
    data: courseData,
    isLoading: courseLoading,
    isError: courseError,
    error: courseErrorObj,
  } = useCourse(courseId)

  const {
    data: lessons = [],
    isLoading: lessonsLoading,
    isError: lessonsError,
    error: lessonsErrorObj,
  } = useLessonsByCourse(courseId)

  const [currentLessonId, setCurrentLessonId] = useState(null)
  useEffect(() => {
    if (lessons.length > 0 && !currentLessonId) {
      setCurrentLessonId(lessons[0].id)
    }
  }, [lessons, currentLessonId])

  const {
    data: currentLesson,
    isLoading: lessonLoading,
    isError: lessonError,
    error: lessonErrorObj,
  } = useLesson(currentLessonId)

  // aggregate any loading/error state
  if (courseLoading || lessonsLoading || lessonLoading) return <Spinner />
  if (courseError)
    return <p className="text-center text-destructive">Error: {courseErrorObj.message}</p>
  if (lessonsError)
    return <p className="text-center text-destructive">Error loading lessons: {lessonsErrorObj.message}</p>
  if (lessonError)
    return <p className="text-center text-destructive">Error loading lesson: {lessonErrorObj.message}</p>

  const {
    rating,
    studentsCount,
    totalDuration,
    updatedAt,
    description,
  } = courseData

  const courseMeta = {
    rating,
    studentsCount,
    totalDuration,
    lastUpdated: new Date(updatedAt).toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric',
    }),
    description,
  }
  const enrolled = Boolean(courseData.enrollment?.enrolledAt)

  const handleToggleComplete = (lessonId) =>
    setCompletedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    )

  return (
    <div className="flex flex-col h-full">
      {/* Video + Content */}
      <div className="hidden lg:flex flex-1">
        <div className="w-2/3 p-4">
          <LessonContent lesson={currentLesson} />
        </div>
        <div className="w-1/3 border-l p-4 overflow-y-auto">
          <CourseContentPanel
            lessons={lessons}
            currentLesson={currentLesson}
            onSelectLesson={(l) => setCurrentLessonId(l.id)}
            completedLessons={courseData.enrollment?.completedLessonIds || []}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>

      {/* Mobile: Video + Tabs */}
      <div className="lg:hidden flex flex-col flex-1">
        <div className="p-4">
          <LessonContent lesson={currentLesson} />
        </div>
        <div className="p-4 flex-1 overflow-auto">
          <ResponsiveTabs
            lessons={lessons}
            currentLesson={currentLesson}
            onSelectLesson={(l) => setCurrentLessonId(l.id)}
            completedLessons={courseData.enrollment?.completedLessonIds || []}
            onToggleComplete={handleToggleComplete}
            courseMeta={courseMeta}
          />
        </div>
      </div>

      {/* Overview bar */}
      <div className="hidden lg:block border-t p-4">
        <OverviewPanel {...courseMeta} enrolled={enrolled} />
      </div>
    </div>
  )
}
