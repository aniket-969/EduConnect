import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseDraftSchema, coursePublishSchema } from "@/schema/courseSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // If you have one
import { toast } from "react-toastify";

const levels = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

const defaultValues = {
  title: "",
  description: "",
  category: "",
  level: "",
  price: "",
  thumbnailUrl: "",
  learningObjectives: [""],
  lessons: [
    { title: "", contentType: "TEXT", content: "" },
  ],
  status: "DRAFT",
};

export default function CourseForm() {
  // We'll start with draft schema by default
  const methods = useForm({
    resolver: zodResolver(courseDraftSchema),
    defaultValues,
    mode: "onBlur",
  });

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = methods;

  const { fields: learningObjectives, append: appendObjective, remove: removeObjective } = useFieldArray({
    control,
    name: "learningObjectives",
  });

  const { fields: lessons, append: appendLesson, remove: removeLesson } = useFieldArray({
    control,
    name: "lessons",
  });

  const status = watch("status");

  // Dynamically switch schema resolver when status changes
  React.useEffect(() => {
    methods.reset(methods.getValues()); // reset form with current values
    methods.control._options.resolver = zodResolver(
      status === "PUBLISHED" ? coursePublishSchema : courseDraftSchema
    );
  }, [status]);

  function onSubmit(data) {
    console.log("Form data to save:", data);
    toast.success(`Course ${data.status.toLowerCase()} successfully!`);
    // Later: API call here
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-8 p-4"
      >
        {/* Left Column: Basic Details */}
        <div className="flex-1 flex flex-col gap-4 border border-border rounded p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Basic Details</h2>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setValue("status", "DRAFT")}>
                Save Draft
              </Button>
              <Button type="submit" variant="primary" onClick={() => setValue("status", "PUBLISHED")}>
                Publish
              </Button>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Title</label>
            <Input {...register("title")} placeholder="Course title" />
            {errors.title && <p className="text-destructive mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <Textarea {...register("description")} placeholder="Course description" rows={4} />
            {errors.description && <p className="text-destructive mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <Input {...register("category")} placeholder="Category" />
            {errors.category && <p className="text-destructive mt-1">{errors.category.message}</p>}
          </div>

          <div>
  <label className="block mb-1 font-medium">Level</label>
  <div className="flex gap-4 mt-1">
    {levels.map((lvl) => (
      <label key={lvl} className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value={lvl}
          {...register("level")}
          className="accent-primary"
        />
        <span className="capitalize">{lvl.toLowerCase()}</span>
      </label>
    ))}
  </div>
  {errors.level && <p className="text-destructive mt-1">{errors.level.message}</p>}
</div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <Input type="number" step="0.01" {...register("price")} placeholder="Price in USD" />
            {errors.price && <p className="text-destructive mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Thumbnail URL</label>
            <Input {...register("thumbnailUrl")} placeholder="Image URL" />
            {errors.thumbnailUrl && <p className="text-destructive mt-1">{errors.thumbnailUrl.message}</p>}
          </div>

          {/* Learning Objectives */}
          <div>
            <label className="block mb-1 font-medium">Learning Objectives</label>
            {learningObjectives.map((item, index) => (
              <div key={item.id} className="flex gap-2 mb-2">
                <Input
                  {...register(`learningObjectives.${index}`)}
                  placeholder={`Objective #${index + 1}`}
                />
                <Button type="button" variant="destructive" onClick={() => removeObjective(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendObjective("")}>
              Add Objective
            </Button>
            {errors.learningObjectives && <p className="text-destructive mt-1">{errors.learningObjectives.message}</p>}
          </div>
        </div>

        {/* Right Column: Lessons */}
        <div className="flex-1 flex flex-col gap-4 border border-border rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Lessons</h2>

          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="border border-muted rounded p-4 mb-3">
              <div>
                <label className="block mb-1 font-medium">Lesson Title</label>
                <Input {...register(`lessons.${index}.title`)} placeholder="Lesson title" />
                {errors.lessons?.[index]?.title && (
                  <p className="text-destructive mt-1">{errors.lessons[index].title.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Content Type</label>
                <select
                  {...register(`lessons.${index}.contentType`)}
                  className="w-full border border-border rounded p-2"
                >
                  <option value="TEXT">Text</option>
                  <option value="VIDEO">Video</option>
                </select>
                {errors.lessons?.[index]?.contentType && (
                  <p className="text-destructive mt-1">{errors.lessons[index].contentType.message}</p>
                )}
              </div>

              <div>
                {watch(`lessons.${index}.contentType`) === "VIDEO" ? (
                  <>
                    <label className="block mb-1 font-medium">Video URL</label>
                    <Input {...register(`lessons.${index}.content`)} placeholder="Video URL" />
                    {errors.lessons?.[index]?.content && (
                      <p className="text-destructive mt-1">{errors.lessons[index].content.message}</p>
                    )}
                  </>
                ) : (
                  <>
                    <label className="block mb-1 font-medium">Text Content</label>
                    <Textarea {...register(`lessons.${index}.content`)} rows={3} />
                    {errors.lessons?.[index]?.content && (
                      <p className="text-destructive mt-1">{errors.lessons[index].content.message}</p>
                    )}
                  </>
                )}
              </div>

              <Button
                type="button"
                variant="destructive"
                onClick={() => removeLesson(index)}
                className="mt-2"
              >
                Remove Lesson
              </Button>
            </div>
          ))}

          <Button type="button" onClick={() => appendLesson({ title: "", contentType: "TEXT", content: "" })}>
            Add Lesson
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
