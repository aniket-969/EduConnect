import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFormContext, useFieldArray } from "react-hook-form";
import LessonItem from "./LessonItem";

export default function ChapterItem({ id, chapterIndex, removeChapter }) {
  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();

  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
    move: moveLesson,
  } = useFieldArray({
    control,
    name: `chapters.${chapterIndex}.lessons`,
  });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleLessonAttachmentChange = (lessonIndex, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue(
      `chapters.${chapterIndex}.lessons.${lessonIndex}.attachment`,
      file
    );
  };

  const clearAttachment = (lessonIndex) => {
    setValue(
      `chapters.${chapterIndex}.lessons.${lessonIndex}.attachment`,
      null
    );
  };

  const onLessonDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = lessonFields.findIndex((l) => l.id === active.id);
    const newIndex = lessonFields.findIndex((l) => l.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    moveLesson(oldIndex, newIndex);
  };

  const chapterErrors = errors?.chapters?.[chapterIndex] || {};
  console.log("Errors:", errors);
  console.log("ChapterErrors for index", chapterIndex, chapterErrors);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-6 p-4 border rounded shadow bg-card "
      data-error-key={`chapters.${chapterIndex}.title`}
    >
      {/* Chapter Header */}
      <div className="flex justify-between items-center mb-3 ">
        <div className="flex items-center gap-2 w-full">
          <span
            {...attributes}
            {...listeners}
            className="cursor-grab text-muted-foreground"
          >
            <GripVertical className="w-4 h-4" />
          </span>
          <Input
            {...register(`chapters.${chapterIndex}.title`)}
            placeholder={`Chapter ${chapterIndex + 1} Title`}
            className="flex-grow"
          />
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="text-white hover:text-red-500 transition-colors"
          onClick={removeChapter}
          title="Remove Chapter"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {typeof chapterErrors.title?.message === "string" && (
        <p className="text-sm text-red-600 -mt-2 pl-6 mb-1">
          {chapterErrors.title.message}
        </p>
      )}

      {typeof chapterErrors.lessons === "object" &&
        !Array.isArray(chapterErrors.lessons) &&
        chapterErrors.lessons?.message && (
          <p className="text-sm text-red-600 -mt-2 pl-6">
            {chapterErrors.lessons.message}
          </p>
        )}

      {/* Lessons List */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onLessonDragEnd}
      >
        <SortableContext
          items={lessonFields.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {lessonFields.map((lesson, lessonIndex) => (
            <LessonItem
              key={lesson.id}
              lessonId={lesson.id}
              chapterIndex={chapterIndex}
              lessonIndex={lessonIndex}
              removeLesson={() => removeLesson(lessonIndex)}
              onAttachmentChange={(e) =>
                handleLessonAttachmentChange(lessonIndex, e)
              }
              onClearAttachment={() => clearAttachment(lessonIndex)}
            />
          ))}
        </SortableContext>
      </DndContext>

      {/* Add Lesson */}
      <Button
        size="sm"
        type="button"
        onClick={() =>
          appendLesson({ title: "", videoUrl: "", attachment: null })
        }
        className="mt-2"
      >
        + Add Lesson
      </Button>
    </div>
  );
}
