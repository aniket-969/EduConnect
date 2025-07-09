import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Eye, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cld } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
export default function DraftedCourseCard({ course }) {
  //const thumb = cld(course.thumbnailUrl, { width: 400, crop: 'fill' });
  const lessonCount = course.lessons?.length || 0;
  const updatedAt = new Date(course.updatedAt).toLocaleDateString();
    const navigate = useNavigate();
  const handleEdit = (course) => {
    if (!course.id) return toast.error("Course ID missing");
    navigate(`/app/instructor/courses/${course.id}/edit`);
  };

  return (
    <Card className="rounded-lg overflow-hidden shadow">
      {/* Thumbnail */}
      {/* <img
        src={thumb}
        alt={course.title}
        className="w-full h-32 object-cover "
      /> */}
      <img
        src={course.thumbnailUrl || "/placeholder.jpg"}
        alt={course.title}
        className="w-full h-40 object-cover -mt-6 "
      />

      {/* Content */}
      <CardContent className="pl-4 space-y-2">
        {/* Title */}
        <h3 className="text-base font-semibold truncate">{course.title}</h3>

        {/* Meta Info */}
        <div className="text-sm text-muted-foreground">
          <p>
            {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
          </p>
          <p className="text-xs">Updated on {updatedAt}</p>
        </div>

        {/* Action Icons */}
        <div className="flex justify-end gap-4 pt-2 mt-auto text-muted-foreground -mb-2">
          <button title="edit">
            <Pencil
              className="w-5 h-5 cursor-pointer hover:text-blue-700"
              onClick={() => handleEdit(course)}
            />
          </button>
          <button title="Preview">
            <Eye
              className="w-5 h-5 cursor-pointer hover:text-green-700"
              onClick={() => handleEdit(course)}
            />
          </button>
          <button title="Delete">
            <Trash2 className="w-5 h-5 cursor-pointer hover:text-red-700" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
