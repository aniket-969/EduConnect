import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  BookOpen,
  IndianRupee,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDeleteCourse } from "@/hooks/useCourse";
import DeleteCourseButton from "@/components/instructor/common/DeleteCourseButton";

export default function CourseCard({
  course,
  type,
  showDateType = "auto",
  showEmptyPlaceholders = false,
}) {
  const navigate = useNavigate();
  const deleteCourseMutation = useDeleteCourse();
  const [showDialog, setShowDialog] = useState(false);
  const lessonCount = course.lessons?.length || 0;
  const updatedAt = course.updatedAt
    ? new Date(course.updatedAt).toLocaleDateString()
    : null;
  const publishedOn = course.publishedOn
    ? new Date(course.publishedOn).toLocaleDateString()
    : null;
  const enrolledCount = course.students?.length || 0;
  const category =
    course.category ||
    (showEmptyPlaceholders ? (
      <span className="italic text-gray-400">No category</span>
    ) : null);
  const level = course.level ? (
    course.level.charAt(0) + course.level.slice(1).toLowerCase()
  ) : showEmptyPlaceholders ? (
    <span className="italic text-gray-400">No level</span>
  ) : null;

  // Price logic: only show rupee symbol if price is a number
  let priceDisplay = null;
  if (course.price === 0) {
    priceDisplay = "Free";
  } else if (typeof course.price === "number") {
    priceDisplay = course.price;
  } else if (showEmptyPlaceholders) {
    priceDisplay = <span className="italic text-gray-400">No price</span>;
  }

  const dateLabel =
    showDateType === "publishedOn"
      ? `Published on ${publishedOn}`
      : showDateType === "updatedAt"
        ? `Updated on ${updatedAt}`
        : type === "published"
          ? `Published on ${publishedOn}`
          : `Updated on ${updatedAt}`;

  const handleEdit = (course) => {
    if (!course.id) return;
    navigate(`/app/instructor/courses/${course.id}/edit`);
  };

  const handlePreview = () => {
    if (!course.id) return;
    navigate(`/app/instructor/courses/${course.id}/preview`);
  };

  return (
    <>
      <Card
        className="rounded-lg overflow-hidden shadow transition-transform duration-200 hover:scale-[1.02] hover:shadow-md h-full flex flex-col cursor-pointer"
        onClick={handlePreview}
      >
    

        <img
          src={course.thumbnailUrl || "/placeholder.jpg"}
          alt={course.title}
          className="w-full h-40 object-cover -mt-6 "
        />
        <CardContent className="pl-4 flex flex-col flex-grow gap-2">
          <h3 className="text-base font-semibold truncate">{course.title}</h3>
          <div className="flex flex-wrap gap-2 text-xs -mt-1">
            {category && <Badge variant="default">{category}</Badge>}
            {level && <Badge variant="secondary">{level}</Badge>}
          </div>
          <div className="flex flex-wrap gap-4 text-muted-foreground text-sm -mt-1">
            {priceDisplay !== null &&
              (priceDisplay === "Free" ? (
                <Badge variant="outline">Free</Badge>
              ) : typeof priceDisplay === "number" ? (
                <div className="flex items-center gap-1">
                  <IndianRupee className="w-3 h-3" />
                  {priceDisplay}
                </div>
              ) : (
                priceDisplay
              ))}
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> {lessonCount}{" "}
              {lessonCount === 1 ? "lesson" : "lessons"}
            </div>
            {type === "published" && (
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span className="text-sm">{enrolledCount}</span>
              </div>
            )}
          </div>
          <div className="mt-auto flex justify-between items-center text-muted-foreground -mb-2">
            <p className="text-xs">{dateLabel}</p>
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button title="edit">
                <Pencil
                  className="w-4 h-4 cursor-pointer hover:text-blue-700"
                  onClick={() => handleEdit(course)}
                />
              </button>
              {type === "draft" && (
                <DeleteCourseButton
                  courseId={course.id}
                  iconOnly={true}
                  buttonClassName="p-1 rounded "
                  stopPropagation={true}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
