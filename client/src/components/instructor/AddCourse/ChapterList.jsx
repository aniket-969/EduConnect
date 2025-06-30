import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ChapterItem from "./ChapterItem";

export default function ChapterList({
  chapters,
  setChapters,
  updateChapterTitle,
  removeChapter,
  addLesson,
  updateLessonField,
  removeLesson,
  handleLessonAttachmentChange,
  reorderLessons,
}) {
  const handleChapterDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = chapters.findIndex((c) => c.id === active.id);
    const newIndex = chapters.findIndex((c) => c.id === over.id);

    setChapters(arrayMove(chapters, oldIndex, newIndex));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleChapterDragEnd}>
      <SortableContext
        items={chapters.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {chapters.map((chapter, index) => (
          <ChapterItem
            key={chapter.id}
            id={chapter.id}
            index={index}
            chapter={chapter}
            updateTitle={(title) => updateChapterTitle(chapter.id, title)}
            remove={() => removeChapter(chapter.id)}
            addLesson={() => addLesson(chapter.id)}
            updateLessonField={updateLessonField}
            removeLesson={removeLesson}
            handleLessonAttachmentChange={handleLessonAttachmentChange}
            reorderLessons={reorderLessons}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
