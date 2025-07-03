import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import ChapterItem from "./ChapterItem";

export default function ChapterList() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    fields: chapterFields,
    append: appendChapter,
    remove: removeChapter,
    move: moveChapter,
  } = useFieldArray({
    control,
    name: "chapters",
  });

  const handleChapterDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = chapterFields.findIndex((c) => c.id === active.id);
    const newIndex = chapterFields.findIndex((c) => c.id === over.id);

    moveChapter(oldIndex, newIndex);
  };

  return (
        <div>
      <div className="flex justify-between items-end mb-6">
        <h3 className="font-semibold">Chapters & Lessons</h3>
        <Button type="button" onClick={() => appendChapter({ title: "", lessons: [] })} data-error-key="chapters">
          + Add Chapter
        </Button>
      </div>

      {errors.chapters && (
  <p className="text-sm text-red-600 -mt-4">
    {errors.chapters.message || errors.chapters._errors?.[0]}
  </p>
)}

    <DndContext collisionDetection={closestCenter} onDragEnd={handleChapterDragEnd}>
      <SortableContext
        items={chapterFields.map((chapter) => chapter.id)}
        strategy={verticalListSortingStrategy}
      >
        {chapterFields.map((chapter, index) => (
          <ChapterItem
            key={chapter.id}
            id={chapter.id}
            chapterIndex={index}
            removeChapter={() => removeChapter(index)}
          />
        ))}
      </SortableContext>
    </DndContext>
      </div>
  );
}
