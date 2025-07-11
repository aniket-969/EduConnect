import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCoursesByInstructor } from "@/hooks/useCourse";
import CourseSkeleton from "@/components/instructor/common/CourseSkeleton";
import { useAuth } from "@/hooks/useAuth";
import DraftedCourseCard from "@/components/instructor/course/DraftedCourseCard";
import PublishedCourseCard from "@/components/instructor/course/PublishedCourseCard";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

export default function CoursesListPage() {
  const { type } = useParams(); // 'draft' or 'published' or undefined
  const { session } = useAuth();
  const instructorId = session.data?.id;
  const { data: courses = [], isLoading } =
    useCoursesByInstructor(instructorId);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine initial tab: if type param exists, use it, else 'all'
  const [selectedTab, setSelectedTab] = useState(type || "all");

  useEffect(() => {
    setSelectedTab(type || "all");
  }, [type, location.key]);

  let filteredCourses = courses;
  // In 'all' tab, show both types and use the correct card for each
  let renderCard = (course) => null;
  if (selectedTab === "published") {
    filteredCourses = courses
      .filter((c) => c.status === "PUBLISHED")
      .sort((a, b) => new Date(b.publishedOn) - new Date(a.publishedOn));
    renderCard = (course) => (
      <PublishedCourseCard key={course.id} course={course} />
    );
  } else if (selectedTab === "draft") {
    filteredCourses = courses
      .filter((c) => c.status === "DRAFT")
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    renderCard = (course) => (
      <DraftedCourseCard
        key={course.id}
        course={course}
        showEmptyPlaceholders
      />
    );
  } else if (selectedTab === "all") {
    filteredCourses = courses.slice().sort((a, b) => {
      const keyA = a.status === "DRAFT" ? a.updatedAt : a.publishedOn;
      const keyB = b.status === "DRAFT" ? b.updatedAt : b.publishedOn;
      return new Date(keyB) - new Date(keyA);
    });
    renderCard = (course) => {
      if (course.status === "PUBLISHED") {
        return (
          <PublishedCourseCard
            key={course.id}
            course={course}
            showDateType="publishedOn"
          />
        );
      } else {
        return (
          <DraftedCourseCard
            key={course.id}
            course={course}
            showDateType="updatedAt"
            showEmptyPlaceholders
          />
        );
      }
    };
  }

  return (
    <div className="w-full  px-4">
      <h2 className="text-2xl font-bold mb-6 capitalize">My Courses</h2>
      <Tabs
        value={selectedTab}
        onValueChange={(val) => {
          setSelectedTab(val);
          if (val === "all") {
            navigate("/app/instructor/courses", { replace: true });
          } else {
            navigate(`/app/instructor/courses/${val}`, { replace: true });
          }
        }}
        className="mb-6"
      >
        <TabsList className="w-full flex gap-2 border-b bg-background p-0 rounded-lg shadow-sm">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`flex-1 px-4 py-2 text-sm font-medium border-b-2 rounded-t-lg transition-colors duration-150
                ${
                  selectedTab === tab.value
                    ? "border-primary text-primary bg-muted shadow"
                    : "border-transparent text-muted-foreground hover:text-primary bg-background"
                }
              `}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {isLoading ? (
        <CourseSkeleton />
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => renderCard(course))}
        </div>
      ) : (
        <p className="text-muted-foreground">No courses found.</p>
      )}
    </div>
  );
}
