import React, { useState } from "react";
import { fakeLessons } from "@/data/fakeLessons";
import LessonContent from "@/components/student/courseLessons/LessonContent";
import CourseContentPanel from "@/components/student/courseLessons/CourseContentPanel";
import OverviewPanel from "@/components/student/courseLessons/OverviewPanel";
import ResponsiveTabs from "@/components/student/courseLessons/ResponsiveTabs";

const CourseLearn = () => {
  const [lessons] = useState(fakeLessons);
  const [currentLesson, setCurrentLesson] = useState(
    fakeLessons[0].lessons[0]
  );

  const courseMeta = {
    rating: 4.6,
    studentsCount: 12676,
    totalDuration: "79h 30m",
    lastUpdated: "March 2025",
    description:
      "Only web development course that you will need. Covers HTML, CSS, Tailwind, Node, React, MongoDB, Prisma, Deployment etc.",
  };

  // pretend these came from enrollment:
  const [completedLessons, setCompletedLessons] = useState([]);

  // toggles completion on or off
  const handleToggleComplete = (lessonId) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* ────── Large screens: Video + Content ────── */}
      <div className="hidden lg:flex flex-1">
        <div className="w-2/3 p-4">
          <LessonContent lesson={currentLesson} />
        </div>
        <div className="w-1/3 border-l p-4 overflow-y-auto">
          <CourseContentPanel
            lessons={lessons}
            currentLesson={currentLesson}
            onSelectLesson={setCurrentLesson}
            completedLessons={completedLessons}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>

      {/* ────── Small screens: Video + Tabs ────── */}
      <div className="lg:hidden flex flex-col flex-1">
        <div className="p-4">
          <LessonContent lesson={currentLesson} />
        </div>
        <div className="p-4 flex-1 overflow-auto">
          <ResponsiveTabs
            lessons={lessons}
            currentLesson={currentLesson}
            onSelectLesson={setCurrentLesson}
            completedLessons={completedLessons}
            onToggleComplete={handleToggleComplete}
            courseMeta={courseMeta}
          />
        </div>
      </div>

      {/* ────── Overview on large screens ────── */}
      <div className="hidden lg:block border-t p-4">
        <OverviewPanel {...courseMeta} />
      </div>
    </div>
  );
};

export default CourseLearn;
