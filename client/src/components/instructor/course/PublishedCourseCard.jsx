import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Eye,
  Users,
  BookOpen,
  IndianRupee,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function PublishedCourseCard({ course }) {
  const navigate = useNavigate();

  const handleEdit = (course) => {
    if (!course.id) return toast.error("Course ID missing");
    navigate(`/app/instructor/courses/${course.id}/edit`);
  };

  const lessonCount = course.lessons?.length || 0;
  const publishedOn = new Date(course.publishedOn).toLocaleDateString();
  const enrolledCount = course.students?.length || 0;

  return (
    <Card className="rounded-lg overflow-hidden shadow transition-transform duration-200 hover:scale-[1.02] hover:shadow-md">
      <img
        src={course.thumbnailUrl || "/placeholder.jpg"}
        alt={course.title}
        className="w-full h-40 object-cover -mt-6 "
      />
      <CardContent className="pl-4 flex flex-col flex-grow gap-2 ">
        <h3 className="text-base font-semibold truncate">{course.title}</h3>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 text-xs -mt-1">
          <Badge variant="default">{course.category}</Badge>
          <Badge variant="secondary">{course.level.charAt(0) + course.level.slice(1).toLowerCase()}</Badge>
        </div>

        {/* Course Info Icons */}
        <div className="flex flex-wrap gap-4 text-muted-foreground text-sm -mt-1">
         
            {course.price === 0 ? (
              <Badge variant="outline">Free</Badge>
            ) : (
              <div className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                {course.price}
              </div>
            )}
        

          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>
              {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span className="text-sm">{enrolledCount}</span>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-auto flex justify-between items-center text-muted-foreground -mb-2">
          <div className="text-xs ">
            <span>Published on {publishedOn}</span>
          </div>
          <div className="flex gap-3">
            <Pencil
              className="w-5 h-5 cursor-pointer hover:text-blue-700"
              onClick={() => handleEdit(course)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
