// LessonItem.jsx
import React,{useRef} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function LessonItem({
  chapterId,
  chapterIndex,
  lesson,
  lessonIndex,
  updateLessonField,
  handleLessonAttachmentChange,
  removeLesson,
  error = {},
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
  const attachmentInputRef = useRef(null);

  const clearAttachment = () => {
    updateLessonField(chapterId, lesson.id, "attachment", null);
    if (attachmentInputRef.current) {
      attachmentInputRef.current.value = "";  // Clear the file input preview
    }
  };

  return (
  <div
  key={lesson.id}
  ref={setNodeRef}
  style={style}
  className="mb-4 p-3 border rounded bg-background"
>
  {/* Title row with drag icon */}
  <div className="flex items-center gap-2 mb-2"
>
    <span
      {...attributes}
      {...listeners}
      className="cursor-grab text-muted-foreground"
    >
      <GripVertical className="w-4 h-4" />
    </span>
<Input
  placeholder={`Lesson ${lessonIndex + 1} Title`}
  value={lesson.title}
  onChange={(e) => updateLessonField(chapterId, lesson.id, "title", e.target.value)}
  className="flex-grow"
data-error-key={`chapters.${chapterIndex}.lessons.${lessonIndex}.title`}

/>
    
    <button
      onClick={() => removeLesson(chapterId, lesson.id)}
      title="Remove Lesson"
      className="text-white hover:text-red-500 transition-colors duration-200 "
    >
      <Trash2 className="w-4 h-4" />
    </button>
    
    
  </div>
  {error.title && (
  <p className="text-sm text-red-600 -mt-2 pl-6 mb-2">{error.title}</p>
)}
  

  {/* Aligned with drag icon using pl-6 */}
  <div className="pl-6 space-y-2 pr-6">
<Input
  placeholder="Video URL"
  value={lesson.videoUrl}
  onChange={(e) => updateLessonField(chapterId, lesson.id, "videoUrl", e.target.value)}
data-error-key={`chapters.${chapterIndex}.lessons.${lessonIndex}.videoUrl`}
/>
    {error.videoUrl && (
  <p className="text-sm text-red-600 -mt-2">{error.videoUrl}</p>
)}

    <Input
      type="file"
      accept="application/pdf,image/*"
      onChange={(e) => handleLessonAttachmentChange(chapterId, lesson.id, e)}
      className="file:mr-4  file:font-normal file:text-gray-500 "
      ref={attachmentInputRef}
    />

    {lesson.attachment && (
      <div className="flex items-center space-x-2 -mt-2 ">
        <p className="text-xs text-muted-foreground">{lesson.attachment.name}</p>
        <button
          type="button"
          onClick={clearAttachment}
          className="text-red-500 hover:text-red-700 font-bold"
          aria-label="Remove attachment"
          title="Remove attachment"
        >
          ✕
        </button>
      </div>
    )}

    {error.attachment && (
  <p className="text-sm text-red-600 -mt-2">{error.attachment}</p>
)}
  </div>
</div>

  );
}