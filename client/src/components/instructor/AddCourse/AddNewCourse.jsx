import React, { useRef } from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseFormSchema } from "@/schema/CourseFormSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "../common/RichTextEditor";
import ChapterList from "./ChapterList";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { createCourse } from "@/api/queries/courses";

export default function AddNewCourse() {
  const thumbnailInputRef = useRef(null);

  const methods = useForm({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      level: "",
      category: "",
      price: "",
      thumbnail: null,
      chapters: [],
    },
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = methods;
  
  const { mutate: submitCourse, isLoading } = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.success("Course created successfully!");
      // optionally reset form or redirect
    },
    onError: (err) => {
      console.error("Course creation failed:", err);
      toast.error(err.response?.data?.message || "Failed to create course");
    },
  });

  const onSubmit = (formData) => {
    submitCourse(formData); // this will call your backend
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
          Add New Course
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button type="submit">Publish</Button>
          </div>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Input placeholder="Course Title" {...register("title")} />
            {errors.title && (
              <p className="text-red-600 text-sm -mt-4">
                {errors.title.message}
              </p>
            )}

            <Input placeholder="Subtitle" {...register("subtitle")} />
            {errors.subtitle && (
              <p className="text-red-600 text-sm -mt-4">
                {errors.subtitle.message}
              </p>
            )}

            <div>
              <label className="block font-medium mb-2">
                Course Description
              </label>
              <RichTextEditor
                value={watch("description")}
                onChange={(value) => setValue("description", value)}
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
              <p className="text-red-600 text-sm -mt-4">
                {errors.level.message}
              </p>
            )}

            <select
              {...register("category")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              {["Web Development", "Data Science", "AI", "Cloud", "Others"].map(
                (cat) => (
                  <option key={cat} value={cat}>
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
