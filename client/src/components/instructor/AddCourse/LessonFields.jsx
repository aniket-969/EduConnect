import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";

const SortableLessonCard = ({ lesson, idx, remove, register, watch,setValue, error }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: lesson.id });
  console.log("lesson err",error)

  const contentType = watch(`lessons.${idx}.contentType`);






  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="p-4 border rounded space-y-2 relative"
    >
      <div className="absolute top-2 left-2 cursor-grab" {...attributes} {...listeners}>
        <GripVertical className="w-4 h-4 text-gray-500" />
      </div>

      <div className="pl-6">
        <label className="block font-semibold mb-1">Lesson Title</label>
        <Input
          placeholder="Eg: Introduction"
          {...register(`lessons.${idx}.title`)}
          className={error.title ? "border-red-500" : ""}
          data-error-key={`lessons.${idx}.title`}
        />
        {error.title && (
          <p className="text-red-600 text-sm mt-1">{error.title.message}</p>
        )}
      </div>

      <div className="pl-6">
  <label className="block font-semibold mb-1">Lesson Type</label>
  <div className="flex gap-4">
    {["VIDEO", "TEXT"].map((t) => (
      <label key={t} className="capitalize">
        <input
          type="radio"
          value={t}
          {...register(`lessons.${idx}.contentType`)}
          onChange={(e) => {
            // Also handle conditional resets
            setValue(`lessons.${idx}.contentType`, e.target.value);
            if (e.target.value === "VIDEO") {
              setValue(`lessons.${idx}.content`, "");
            } else {
              setValue(`lessons.${idx}.videoUrl`, "");
            }
          }}
          checked={contentType === t}
        />
        {t}
      </label>
    ))}
  </div>

  {error.contentType && (
    <p className="text-red-600 text-sm mt-1" data-error-key={`lessons.${idx}.contentType`}>
      {error.contentType.message}
    </p>
  )}
</div>

  

      <div className="pl-6">
        {contentType === "VIDEO" ? (
          <>
            <label className="block font-semibold mb-1">Video URL</label>
            <Input
              placeholder="https:// or http://"
              {...register(`lessons.${idx}.videoUrl`)}
              className={error.videoUrl ? "border-red-500" : ""}
              data-error-key={`lessons.${idx}.videoUrl`}
            />
            {error.videoUrl && (
              <p className="text-red-600 text-sm mt-1">{error.videoUrl.message}</p>
            )}
          </>
        ) : (
          <>
            <label className="block font-semibold mb-1">Content</label>
            <Textarea
              rows={3}
              placeholder="Write text content here"
              {...register(`lessons.${idx}.content`)}
              className={error.content ? "border-red-500" : ""}
              data-error-key={`lessons.${idx}.content`}
            />
            {error.content && (
              <p className="text-red-600 text-sm mt-1">{error.content.message}</p>
            )}
          </>
        )}
      </div>

      <Button
        type="button"
        size="icon"
        variant="none"
        className="absolute top-2 right-2 text-white hover:text-red-500 transition-colors"
        onClick={() => remove(idx)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

const LessonFields = () => {
  const {
    control,
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const {
    fields,
    append,
    remove,
    move,
  } = useFieldArray({
    control,
    name: "lessons",
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);

    move(oldIndex, newIndex);

    // Update sequence field after move
    const updatedLessons = getValues("lessons").map((lesson, idx) => ({
      ...lesson,
      sequence: idx + 1,
    }));

    setValue("lessons", updatedLessons);
  };

  useEffect(() => {
    // Initialize sequence field on mount
    const updated = getValues("lessons").map((lesson, idx) => ({
      ...lesson,
      sequence: lesson.sequence ?? idx + 1,
    }));
    setValue("lessons", updated);
  }, [getValues, setValue]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Lessons</h2>
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              title: "",
              contentType: "VIDEO",
              videoUrl: "",
              content: "",
              sequence: fields.length + 1,
            })
          }
        >
          Add Lesson
        </Button>
      </div>

      {fields.length === 0 && <p className="text-gray-600">No lessons added yet.</p>}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
          {fields.map((lesson, idx) => (
            <SortableLessonCard
              key={lesson.id}
              lesson={lesson}
              idx={idx}
              remove={remove}
              register={register}
              watch={watch}
              setValue={setValue}
              error={errors.lessons?.[idx] || {}}
            />
          ))}
        </SortableContext>
      </DndContext>

      {(errors.lessons?.message ?? errors.lessons?.root?.message) && (
  <p className="text-red-600 text-sm mt-1" data-error-key="lessons">
    {errors.lessons.message || errors.lessons.root.message}
  </p>
)}

    </div>
  );
};

export default LessonFields;
