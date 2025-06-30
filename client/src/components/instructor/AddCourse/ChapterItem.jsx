// 📁 src/app/routes/pages/ChapterItem.jsx
import React from "react";
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
import LessonItem from "./LessonItem";

export default function ChapterItem({
  id,
  index,
  chapter,
  updateTitle,
  remove,
  addLesson,
  updateLessonField,
  removeLesson,
  handleLessonAttachmentChange,
  reorderLessons,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onLessonDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = chapter.lessons.findIndex((l) => l.id === active.id);
    const newIndex = chapter.lessons.findIndex((l) => l.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    reorderLessons(chapter.id, oldIndex, newIndex);
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-6 p-4 border rounded shadow bg-card">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 w-full">
          <span {...attributes} {...listeners} className="cursor-grab text-muted-foreground">
            <GripVertical className="w-4 h-4" />
          </span>
          <Input
            value={chapter.title}
            onChange={(e) => updateTitle(e.target.value)}
            placeholder={`Chapter ${index + 1} Title`}
            className="flex-grow"
          />
        </div>
        <Button size="icon" variant="ghost" onClick={remove} title="Remove Chapter">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={onLessonDragEnd}>
        <SortableContext
          items={chapter.lessons.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {chapter.lessons.map((lesson, idx) => (
            <LessonItem
              key={lesson.id}
              chapterId={chapter.id}
              lesson={lesson}
              index={idx}
              updateLessonField={updateLessonField}
              handleLessonAttachmentChange={handleLessonAttachmentChange}
              removeLesson={removeLesson}
            />
          ))}
        </SortableContext>
      </DndContext>

      <Button size="sm" onClick={addLesson} className="mt-2">
        + Add Lesson
      </Button>
    </div>
  );
}