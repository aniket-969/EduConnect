import React, { useEffect, useRef } from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CourseDraftSchema,
  CoursePublishedSchema,
} from "@/schema/courseSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "../common/RichTextEditor";
import ChapterList from "./ChapterList";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCourse,
  updateCourse,
  getCourseById,
} from "@/api/queries/courses";
import { useParams } from "react-router-dom";

export default function CourseForm() {
  const { courseId } = useParams();
  const isEditMode = !!courseId;

  const thumbnailInputRef = useRef(null);

  const methods = useForm({
    resolver: zodResolver(CourseDraftSchema),
    defaultValues: {
      title: "",
      description: "",
      level: "",
      category: "",
      price: "",
      thumbnail: null,
      chapters: [],
      status: "draft",
    },
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = methods;

// Fetch course if editing (mock this part for now)
  const { data: courseData, isLoading: loadingCourse } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId), // mock/fake for now
    enabled: isEditMode,
    onSuccess: (data) => {
      reset({
        ...data,
        thumbnail: null, // user has to re-upload if needed
        status: "draft",
      });
    },
  });

  const mutation = useMutation({
    mutationFn: isEditMode ? updateCourse : createCourse,
    onSuccess: () => {
      toast.success(`Course ${isEditMode ? "updated" : "created"} successfully!`);
      if (!isEditMode) reset();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong");
    },
  });

  const submitAction = useRef("draft"); // default

  const setFormErrors = (zodError) => {
    let firstErrorField = null;

    const recurseErrors = (errorObject, path = []) => {
      for (const key in errorObject) {
        if (key === "_errors" && errorObject[key].length > 0) {
          const fieldPath = path.join(".");
          setError(fieldPath, {
            type: "manual",
            message: errorObject[key][0],
          });

          if (!firstErrorField) {
            firstErrorField = fieldPath;
          }
        } else if (
          typeof errorObject[key] === "object" &&
          errorObject[key] !== null
        ) {
          recurseErrors(errorObject[key], [...path, key]);
        }
      }
    };

    recurseErrors(zodError.format());

    // Scroll after errors are set
    if (firstErrorField) {
      const errorElement = document.querySelector(
        `[data-error-key="${firstErrorField}"]`
      );
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus?.(); // optional focus
      }
    }
  };

const onSubmit = async (formData) => {
    formData.status = submitAction.current;

    if (submitAction.current === "published") {
      const result = CoursePublishedSchema.safeParse(formData);
      if (!result.success) {
        toast.error("Fix errors before publishing.");
        setFormErrors(result.error);
        return;
      }
      mutation.mutate({ id: courseId, ...result.data });
    } else {
      mutation.mutate({ id: courseId, ...formData });
    }
  };


  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("thumbnail", file);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto space-y-6 shadow rounded-md"
      >
        <h2 className="text-2xl font-semibold mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {isEditMode ? "Edit Course" : "Add New Course"}
          <div className="flex gap-4 justify-end ">
            <Button
              type="submit"
              variant="outline"
              disabled={mutation.isLoading}
              onClick={() => (submitAction.current = "draft")}
            >
              Save as Draft
            </Button>

            <Button
              type="submit"
              disabled={mutation.isLoading}
              onClick={() => (submitAction.current = "published")}
            >
              Publish
            </Button>
          </div>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Input
              placeholder="Course Title"
              {...register("title")}
              data-error-key="title"
            />
            {errors.title && (
              <p className="text-red-600 text-sm -mt-4">
                {errors.title.message}
              </p>
            )}

            <div>
              <label className="block font-medium mb-2">
                Course Description
              </label>
              <RichTextEditor
                value={watch("description")}
                onChange={(value) => setValue("description", value)}
                data-error-key="description"
              />
              {errors.description && (
                <p className="text-red-600 text-sm ">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {["Easy", "Intermediate", "Hard"].map((lvl) => (
                <label
                  key={lvl}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={lvl}
                    {...register("level")}
                    checked={watch("level") === lvl}
                  />
                  {lvl}
                </label>
              ))}
            </div>
            {errors.level && (
              <p className="text-red-600 text-sm -mt-4" data-error-key="level">
                {errors.level.message}
              </p>
            )}

            <select
              {...register("category")}
              className="w-full p-2 border rounded"
              data-error-key="category"
            >
              <option value="" className="bg-primary">
                Select Category
              </option>
              {["Web Development", "Data Science", "AI", "Cloud", "Others"].map(
                (cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className="bg-accent-foreground"
                  >
                    {cat}
                  </option>
                )
              )}
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm -mt-4">
                {errors.category.message}
              </p>
            )}

            <Input
              type="number"
              placeholder="Course Price (₹)"
              {...register("price")}
              min={0}
              data-error-key="price"
            />
            {errors.price && (
              <p className="text-red-600 text-sm -mt-4">
                {errors.price.message}
              </p>
            )}

            <Input
              type="file"
              accept="image/*"
              ref={thumbnailInputRef}
              onChange={handleThumbnailChange}
              className="file:mr-4 file:font-normal file:text-gray-500"
              data-error-key="thumbnail"
            />
            {watch("thumbnail") && (
              <div className="flex items-center space-x-2">
                <img
                  src={URL.createObjectURL(watch("thumbnail"))}
                  alt="Preview"
                  className="w-32 h-20 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setValue("thumbnail", null);
                    thumbnailInputRef.current.value = null;
                  }}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </div>
            )}
            {errors.thumbnail && (
              <p className="text-red-600 text-sm -mt-4">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          <ChapterList />
        </div>
      </form>
    </FormProvider>
  );
}
