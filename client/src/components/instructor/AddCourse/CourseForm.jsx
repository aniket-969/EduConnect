import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseDraftSchema, coursePublishSchema } from "@/schema/courseSchema";
import {
  createCourse,
  updateCourse,
  publishCourse,
  getCourseById,
} from "@/api/queries/mockCourse";
import LessonFields from "./LessonFields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const CourseForm = ({ courseId }) => {
  const isEditMode = Boolean(courseId);
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(courseDraftSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "easy",
      price: 0,
      thumbnail: null,
      learningObjectives: [],
      lessons: [],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = methods;

  
  const {
    fields: objectiveFields,
    append: appendObjective,
    remove: removeObjective,
  } = useFieldArray({ control, name: "learningObjectives" });
  const onRemoveObjective = async (idx) => {
    removeObjective(idx);
    console.log("ll", getValues("learningObjectives"));
    const remaining = getValues("learningObjectives");
    if (remaining.length <= 1) {
      // Delay slightly to allow removal before validation
      setTimeout(() => {
        trigger("learningObjectives");
      }, 10);
    }
  };
  console.log("e", errors);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      getCourseById(courseId)
        .then((course) => {
          reset({
            ...course,
            thumbnail: null,
            learningObjectives: course.learningObjectives?.length
              ? course.learningObjectives
              : [""],
          });
          setStatus(course.status);
        })
        .catch(() => toast.error("Failed to load course"))
        .finally(() => setLoading(false));
    }
  }, [courseId, isEditMode, reset]);

  const applyValidationSchema = (schema) => {
    methods.control._options.resolver = zodResolver(schema);
  };

  const scrollToFirstError = (errors) => {
    const flatKeys = Object.keys(errors);

    const firstErrorKey = flatKeys[0];

    const el = document.querySelector(`[data-error-key="${firstErrorKey}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus?.();
    }
  };

  const onSaveDraft = async (data) => {
    try {
      applyValidationSchema(courseDraftSchema);
      const valid = await methods.trigger();
      if (!valid) return toast.error("Fix errors before saving draft");

      if (isEditMode) {
        await updateCourse(courseId, data);
        toast.success("Draft updated");
      } else {
        const created = await createCourse(data);
        toast.success("Draft saved");
        window.location.href = `/app/instructor/courses/edit/${created.id}`;
      }
    } catch {
      toast.error("Failed to save draft");
    }
  };

  const onPublish = async (data) => {
    try {
      applyValidationSchema(coursePublishSchema);
      const valid = await methods.trigger();
      if (!valid) {
        scrollToFirstError(methods.formState.errors);
        return toast.error("Fix errors before publishing");
      }

      let id = courseId;
      if (!isEditMode) {
        const created = await createCourse(data);
        id = created.id;
      } else {
        await updateCourse(id, data);
      }

      await publishCourse(id);
      setStatus("published");
      toast.success("Course published");
    } catch (err) {
      toast.error(err.message || "Publish failed");
    }
  };

  const thumbnailFile = watch("thumbnail");

  if (loading) return <p>Loading...</p>;

  return (
    <FormProvider {...methods}>
      <form className="space-y-6 px-4 " noValidate>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Edit Course" : "Add Course"}
          </h1>
          <div className="flex gap-2">
            {status !== "published" ? (
              <>
                <Button onClick={handleSubmit(onSaveDraft)}>
                  Save as Draft
                </Button>
                <Button variant="outline" onClick={handleSubmit(onPublish)}>
                  Publish Course
                </Button>
              </>
            ) : (
              <Button onClick={handleSubmit(onPublish)}>Update Course</Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <Input
                placeholder="Enter course title"
                {...register("title")}
                className={errors.title ? "border-red-500" : ""}
                data-error-key="title"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Description</label>
              <Textarea
                placeholder="Write a short description"
                {...register("description")}
                className={errors.description ? "border-red-500" : ""}
                data-error-key="description"
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Category</label>
              <Input
                placeholder="Eg: Web Development"
                {...register("category")}
                className={errors.category ? "border-red-500" : ""}
                data-error-key="category"
              />
              {errors.category && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Level</label>
              <div className="flex gap-4">
                {["easy", "intermediate", "hard"].map((lvl) => (
                  <label key={lvl} className="capitalize">
                    <input type="radio" value={lvl} {...register("level")} />{" "}
                    {lvl}
                  </label>
                ))}
              </div>
              {errors.level && (
                <p className="text-red-600 text-sm mt-1" data-error-key="level">
                  {errors.level.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Price (₹)</label>
              <Input
                type="number"
                min={0}
                placeholder="Eg: 499"
                {...register("price", { valueAsNumber: true })}
                className={errors.price ? "border-red-500" : ""}
                data-error-key="price"
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Learning Objectives
              </label>

              {objectiveFields.map((obj, idx) => (
                <div key={obj.id} className="flex items-center gap-2 mb-2">
                  <div className="w-full">
                    <Input
                      placeholder="Eg: Understand JSX"
                      {...register(`learningObjectives.${idx}`)}
                      className={
                        errors.learningObjectives?.[idx] ? "border-red-500" : ""
                      }
                      data-error-key={`learningObjectives.${idx}`}
                    />
                    {/* 👇 individual error for that objective */}
                    {errors.learningObjectives?.[idx] && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.learningObjectives[idx]?.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="none"
                    onClick={() => onRemoveObjective(idx)}
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 " />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="secondary"
                onClick={() => appendObjective("")}
              >
                Add Objective
              </Button>

              {(errors.learningObjectives?.message ?? errors.learningObjectives?.root?.message) && (
  <p className="text-red-600 text-sm mt-1" data-error-key="lessons">
    {errors.learningObjectives.message || errors.learningObjectives.root.message}
  </p>
)}

            </div>

            <div>
              <label className="block font-semibold mb-1">Thumbnail *</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setValue("thumbnail", e.target.files?.[0] || null)
                }
                className={`file:mr-4 ${errors.thumbnail ? "border-red-500" : ""}`}
                data-error-key="thumbnail"
              />
              {errors.thumbnail && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.thumbnail.message}
                </p>
              )}
              {thumbnailFile && thumbnailFile instanceof File && (
                <img
                  src={URL.createObjectURL(thumbnailFile)}
                  alt="Preview"
                  className="mt-2 max-h-40 rounded"
                />
              )}
            </div>
          </div>
<LessonFields />

        </div>
      </form>
    </FormProvider>
  );
};

export default CourseForm;
