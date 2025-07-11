import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Eye,
  Trash2,
  BookOpen,
  IndianRupee,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function CourseCard({
  course,
  type,
  showDateType = "auto",
  showEmptyPlaceholders = false,
}) {
  const navigate = useNavigate();
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
  const price =
    course.price === 0 ? (
      "Free"
    ) : course.price ? (
      course.price
    ) : showEmptyPlaceholders ? (
      <span className="italic text-gray-400">No price</span>
    ) : null;
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

  return (
    <Card className="rounded-lg overflow-hidden shadow transition-transform duration-200 hover:scale-[1.02] hover:shadow-md h-full flex flex-col">
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
          {price !== null &&
            (price === "Free" ? (
              <Badge variant="outline">Free</Badge>
            ) : (
              <div className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                {price}
              </div>
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
          <div className="flex gap-3">
            <button title="edit">
              <Pencil
                className="w-5 h-5 cursor-pointer hover:text-blue-700"
                onClick={() => handleEdit(course)}
              />
            </button>
           
            {type === "draft" && (
              <button title="Delete">
                <Trash2 className="w-5 h-5 cursor-pointer hover:text-red-700" />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
