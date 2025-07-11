import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCoursesByInstructor } from "@/hooks/useCourse";
import CourseSkeleton from "@/components/instructor/common/CourseSkeleton";
import { useAuth } from "@/hooks/useAuth";
import CourseCard from "@/components/instructor/course/CourseCard";
import { useEffect, useState, useMemo } from "react";
import FilterBar from "@/components/student/course/filterBar";
import InstructorTabs from "@/components/instructor/course/InstructorTabs";
import TablePagination from "@/components/instructor/common/TablePagination";

const TABS = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

// Helper: Render course card
function renderCourseCard(course, selectedTab) {
  if (selectedTab === "published") {
    return (
      <CourseCard
        key={course.id}
        course={course}
        type="published"
        showDateType="publishedOn"
      />
    );
  } else if (selectedTab === "draft") {
    return (
      <CourseCard
        key={course.id}
        course={course}
        type="draft"
        showDateType="updatedAt"
        showEmptyPlaceholders
      />
    );
  } else {
    // "all" tab
    return (
      <CourseCard
        key={course.id}
        course={course}
        type={course.status === "PUBLISHED" ? "published" : "draft"}
        showDateType={
          course.status === "PUBLISHED" ? "publishedOn" : "updatedAt"
        }
        showEmptyPlaceholders={course.status === "DRAFT"}
      />
    );
  }
}

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

  // Filter state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [sort, setSort] = useState("newest");

  // Pagination state
  const [page, setPage] = useState(1);
  const CARDS_PER_PAGE = 8;

  // Extract unique categories from courses
  const categories = Array.from(
    new Set(courses.map((c) => c.category).filter(Boolean))
  );
  // Always show all levels in dropdown (lowercase for UI, but filter against uppercase in data)
  const levels = ["beginner", "intermediate", "advanced"];

  // Memoized filtered and sorted courses
  const filteredCourses = useMemo(() => {
    let result = courses
      .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
      .filter((c) => category === "all" || c.category === category)
      .filter(
        (c) => level === "all" || (c.level && c.level.toLowerCase() === level)
      );

    if (selectedTab === "published") {
      result = result
        .filter((c) => c.status === "PUBLISHED")
        .sort((a, b) => {
          if (sort === "alphabetical") return a.title.localeCompare(b.title);
          if (sort === "popular") return (b.rating || 0) - (a.rating || 0);
          return new Date(b.publishedOn) - new Date(a.publishedOn);
        });
    } else if (selectedTab === "draft") {
      result = result
        .filter((c) => c.status === "DRAFT")
        .sort((a, b) => {
          if (sort === "alphabetical") return a.title.localeCompare(b.title);
          if (sort === "popular") return (b.rating || 0) - (a.rating || 0);
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    } else if (selectedTab === "all") {
      result = result.slice().sort((a, b) => {
        if (sort === "alphabetical") return a.title.localeCompare(b.title);
        if (sort === "popular") return (b.rating || 0) - (a.rating || 0);
        const keyA = a.status === "DRAFT" ? a.updatedAt : a.publishedOn;
        const keyB = b.status === "DRAFT" ? b.updatedAt : b.publishedOn;
        return new Date(keyB) - new Date(keyA);
      });
    }
    return result;
  }, [courses, search, category, level, sort, selectedTab]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / CARDS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE
  );

  return (
    <div className="w-full px-4">
      <h2 className="text-2xl font-bold mb-6 capitalize">My Courses</h2>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        level={level}
        onLevelChange={setLevel}
        sort={sort}
        onSortChange={setSort}
        categories={categories}
        levels={levels}
      />
      <InstructorTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        navigate={navigate}
      />
      {isLoading ? (
        <CourseSkeleton />
      ) : filteredCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-6">
            {paginatedCourses.map((course) =>
              renderCourseCard(course, selectedTab)
            )}
          </div>
          <TablePagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            className="mb-12"
          />
        </>
      ) : (
        <p className="text-muted-foreground">No courses found.</p>
      )}
    </div>
  );
}
