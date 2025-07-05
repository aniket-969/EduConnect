import React from "react";
import { GripVertical, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function LessonCards({
  index,
  lesson,
  register,
  errors,
  onRemove,
  dragAttributes,
  dragListeners,
}) {
  const contentType = lesson.contentType || "VIDEO";

  // Handle error styling manually
  const borderClass = errors?.[index] ? "border border-destructive" : "border";

  return (
    <div
      className={`rounded-xl p-4 bg-muted space-y-4 relative ${borderClass}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-grab"
            {...dragListeners}
            {...dragAttributes}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </button>
          <span className="font-medium text-sm text-muted-foreground">
            Lesson {index + 1}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => onRemove(index)}
        >
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      </div>

      <Input
        {...register(`lessons.${index}.title`)}
        placeholder="Lesson Title"
      />
      {errors?.[index]?.title && (
        <p className="text-xs text-destructive">{errors[index].title.message}</p>
      )}

      <div className="flex gap-4 text-sm">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            value="VIDEO"
            {...register(`lessons.${index}.contentType`)}
            defaultChecked={contentType === "VIDEO"}
          />
          Video
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            value="TEXT"
            {...register(`lessons.${index}.contentType`)}
            defaultChecked={contentType === "TEXT"}
          />
          Text
        </label>
      </div>
      {errors?.[index]?.contentType && (
        <p className="text-xs text-destructive">{errors[index].contentType.message}</p>
      )}

      {contentType === "TEXT" ? (
        <Textarea
          {...register(`lessons.${index}.content`)}
          placeholder="Enter lesson text content..."
          className="resize-none max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted"
        />
      ) : (
        <Input
          {...register(`lessons.${index}.content`)}
          placeholder="https://video-url.com"
        />
      )}
      {errors?.[index]?.content && (
        <p className="text-xs text-destructive">{errors[index].content.message}</p>
      )}
    </div>
  );
}
