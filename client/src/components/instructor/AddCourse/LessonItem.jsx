// 📁 src/app/routes/pages/LessonItem.jsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function LessonItem({
  chapterId,
  lesson,
  index,
  updateLessonField,
  handleLessonAttachmentChange,
  removeLesson,
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      key={lesson.id}
      ref={setNodeRef}
      style={style}
      className="mb-4 p-3 border rounded bg-background"
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab text-muted-foreground"
        >
          <GripVertical className="w-4 h-4" />
        </span>
        <Input
          placeholder={`Lesson ${index + 1} Title`}
          value={lesson.title}
          onChange={(e) =>
            updateLessonField(chapterId, lesson.id, "title", e.target.value)
          }
          className="flex-grow"
        />
      </div>
      <Input
        placeholder="Video URL"
        value={lesson.videoUrl}
        onChange={(e) =>
          updateLessonField(chapterId, lesson.id, "videoUrl", e.target.value)
        }
        className="mb-2"
      />
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => handleLessonAttachmentChange(chapterId, lesson.id, e)}
          className="w-full"
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() => removeLesson(chapterId, lesson.id)}
          title="Remove Lesson"
        >
          Remove
        </Button>
      </div>
      {lesson.attachment && (
        <p className="text-xs text-muted-foreground mt-1">
          {lesson.attachment.name}
        </p>
      )}
    </div>
  );
}