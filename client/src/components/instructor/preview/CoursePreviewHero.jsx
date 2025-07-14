import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  IndianRupee,
  Users,
  CalendarClock,
  MonitorPlay,
} from "lucide-react";

export default function CoursePreviewHero({ course }) {
  if (!course) return null;
  const {
    title,
    description,
    price,
    category,
    level,
    status,
    instructor,
    thumbnailUrl,
    lessons,
    students,
    updatedAt,
    publishedOn,
    createdAt,
  } = course;

  const formattedDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  let priceDisplay = null;
  if (price === 0) {
    priceDisplay = "Free";
  } else if (typeof price === "number") {
    priceDisplay = price;
  } else if (price === null || price === undefined) {
    priceDisplay = (
      <span className="italic text-muted-foreground">No price</span>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <img
        src={thumbnailUrl || "/placeholder.jpg"}
        alt={title}
        className="w-100 lg:w-100 h-56 object-cover rounded-xl shadow"
      />
      <div className="flex flex-col gap-2 flex-1 justify-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <div className="flex flex-wrap gap-2 mb-1">
          {category && <Badge>{category}</Badge>}
          {level && <Badge variant="secondary">{level}</Badge>}
          <Badge variant="outline">{status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-1">
          <MonitorPlay className="inline w-4 h-4 mr-1" />
          {description || (
            <span className="italic text-muted-foreground">
              No description provided.
            </span>
          )}
        </p>
        <div className="text-sm text-muted-foreground space-y-1 mb-2">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4" />
            <span>Created: {formattedDate(createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4" />
            <span>Updated: {formattedDate(updatedAt)}</span>
          </div>
          {status === "PUBLISHED" && (
            <div className="flex items-center gap-2">
              <CalendarClock className="w-4 h-4" />
              <span>Published: {formattedDate(publishedOn)}</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {priceDisplay &&
            (priceDisplay === "Free" ? (
              <Badge variant="outline">Free</Badge>
            ) : typeof priceDisplay === "number" ? (
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4" />
                {priceDisplay}
              </div>
            ) : (
              priceDisplay
            ))}
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{lessons?.length || 0} lessons</span>
          </div>
          {status === "PUBLISHED" && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{students?.length || 0} enrolled</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
