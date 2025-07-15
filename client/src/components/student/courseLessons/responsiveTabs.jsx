import React, { useState } from "react";
import CourseContentPanel from "./CourseContentPanel";
import OverviewPanel from "./OverviewPanel";

const ResponsiveTabs = ({
  lessons,
  currentLesson,
  onSelectLesson,
  completedLessons,
  onMarkComplete,
  courseMeta,
}) => {
  const [activeTab, setActiveTab] = useState("content");  // or "overview"

  // Helper to style active vs inactive
  const tabClass = (tab) =>
    `flex-1 py-2 text-center ${
      activeTab === tab
        ? "border-b-2 border-blue-600 font-semibold"
        : "text-gray-600"
    }`;

  return (
    <div className="w-full">
      {/* ─── Tab Bar ─── */}
      <div className="flex border-b">
        <button className={tabClass("content")} onClick={() => setActiveTab("content")}>
          Course Content
        </button>
        <button className={tabClass("overview")} onClick={() => setActiveTab("overview")}>
          Overview
        </button>
      </div>

      {/* ─── Panels ─── */}
      <div className="mt-4">
        {activeTab === "content" ? (
          <CourseContentPanel
            lessons={lessons}
            currentLesson={currentLesson}
            onSelectLesson={onSelectLesson}
            completedLessons={completedLessons}
            onMarkComplete={onMarkComplete}
          />
        ) : (
          <OverviewPanel {...courseMeta} />
        )}
      </div>
    </div>
  );
};

export default ResponsiveTabs;
