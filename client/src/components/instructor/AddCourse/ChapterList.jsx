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
  errors = {},
}) {
  const handleChapterDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = chapters.findIndex((c) => c.id === active.id);
    const newIndex = chapters.findIndex((c) => c.id === over.id);

    setChapters(arrayMove(chapters, oldIndex, newIndex));
  };
  function getLessonErrors(errors, chapterIndex, chapter) {
    const lessonErrors = {};

    for (const [key, message] of Object.entries(errors)) {
      const regex = new RegExp(
        `^chapters\\.${chapterIndex}\\.lessons\\.(\\d+)\\.(\\w+)$`
      );
      const match = key.match(regex);
      if (match) {
        const [, lessonIndexStr, field] = match;
        const lessonIndex = parseInt(lessonIndexStr);
        const lessonId = chapter.lessons?.[lessonIndex]?.id;
        if (lessonId) {
          if (!lessonErrors[lessonId]) lessonErrors[lessonId] = {};
          lessonErrors[lessonId][field] = message;
        }
      }
    }

    return lessonErrors;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleChapterDragEnd}
    >
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
            chapterError={
              errors[`chapters.${index}.title`] ||
              errors[`chapters.${index}.lessons`] ||
              errors[`chapters.${index}.duplicateLessons`]
            }
            lessonErrors={getLessonErrors(errors, index, chapter)}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
