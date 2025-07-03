import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useFormContext } from "react-hook-form";

export default function LessonItem({
  lessonId,
  chapterIndex,
  lessonIndex,
  removeLesson,
  onAttachmentChange,
  onClearAttachment,
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: lessonId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const attachmentInputRef = useRef(null);
  const lessonPath = `chapters.${chapterIndex}.lessons.${lessonIndex}`;
  const lessonData = watch(lessonPath);
  const lessonErrors = errors?.chapters?.[chapterIndex]?.lessons?.[lessonIndex] || {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-4 p-3 border rounded bg-background"
    >
      {/* Title Row */}
      <div className="flex items-center gap-2 mb-2">
        <span {...attributes} {...listeners} className="cursor-grab text-muted-foreground">
          <GripVertical className="w-4 h-4" />
        </span>

        <Input
          {...register(`${lessonPath}.title`)}
          placeholder={`Lesson ${lessonIndex + 1} Title`}
          className="flex-grow"
          data-error-key={`${lessonPath}.title`}
        />

        <button
          type="button"
          onClick={removeLesson}
          className="text-white hover:text-red-500 transition-colors"
          title="Remove Lesson"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      {lessonErrors?.title && (
        <p className="text-sm text-red-600 -mt-2 pl-6 mb-2">{lessonErrors.title.message}</p>
      )}

      {/* URL & File */}
      <div className="pl-6 space-y-2 pr-6">
        <Input
          {...register(`${lessonPath}.videoUrl`)}
          placeholder="Video URL"
          data-error-key={`${lessonPath}.videoUrl`}

        />
        {lessonErrors?.videoUrl && (
          <p className="text-sm text-red-600 -mt-2">{lessonErrors.videoUrl.message}</p>
        )}

        <Input
          type="file"
          accept="application/pdf,image/*"
          onChange={onAttachmentChange}
          className="file:mr-4 file:font-normal file:text-gray-500"
          ref={attachmentInputRef}
        />

        {lessonData?.attachment && (
          <div className="flex items-center space-x-2 -mt-2">
            <p className="text-xs text-muted-foreground">{lessonData.attachment.name}</p>
            <button
              type="button"
              onClick={() => {
                onClearAttachment();
                if (attachmentInputRef.current) {
                  attachmentInputRef.current.value = "";
                }
              }}
              className="text-red-500 hover:text-red-700 font-bold"
              title="Remove attachment"
            >
              ✕
            </button>
          </div>
        )}

        {lessonErrors?.attachment && (
          <p className="text-sm text-red-600 -mt-2">{lessonErrors.attachment.message}</p>
        )}
      </div>
    </div>
  );
}
