import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseDraftSchema, coursePublishSchema } from "@/schema/courseSchema";
import {
  useCourse,
  useCreateCourse,
  useUpdateCourse,
  usePublishCourse,
} from "@/hooks/useCourse";

import LessonFields from "./LessonFields";
import BasicFields from "./BasicFields";
import { Button } from "@/components/ui/button";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

const CourseForm = ({ courseId }) => {
  const isEditMode = Boolean(courseId);
  const [status, setStatus] = useState("DRAFT");
const [savingDraft, setSavingDraft] = useState(false);
const [publishing, setPublishing] = useState(false);


  const methods = useForm({
    resolver: zodResolver(courseDraftSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "BEGINNER",
      price: 0,
      thumbnailUrl: null,
      learningObjectives: [],
      lessons: [],
    },
  });

  const { handleSubmit, reset } = methods;
  const navigate = useNavigate();

  const { data: courseData, isLoading, isError } = useCourse(courseId);
  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();
  const publishCourseMutation = usePublishCourse();

  useEffect(() => {
    if (isEditMode && courseData) {
      reset({
        ...courseData,
        thumbnailUrl: null,
        learningObjectives:
          courseData.learningObjectives?.length > 0
            ? courseData.learningObjectives
            : [],
      });
      setStatus(courseData.status);
    }
  }, [courseData, isEditMode, reset]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course</p>;

  const onSaveDraft = async (data) => {
    try {
      setSavingDraft(true);
      applyValidationSchema(courseDraftSchema);
      const valid = await methods.trigger();
      if (!valid) return toast.error("Fix errors before saving draft");

      if (isEditMode) {
        await updateCourseMutation.mutateAsync({ id: courseId, data });
        toast.success("Draft updated");
      } else {
        await createCourseMutation.mutateAsync(data);
        toast.success("Draft saved");
      }
      navigate(paths.app.instructorDashboard.courses.getHref());
    } catch {
      toast.error("Failed to save draft");
    }finally {
    setSavingDraft(false); // stop loading
  }
  };

  //uncomment this for real api and comment below

  // const onPublish = async (data) => {
  //   try {
  //     applyValidationSchema(coursePublishSchema);
  //     const valid = await methods.trigger();
  //     if (!valid) {
  //       scrollToFirstError(methods.formState.errors);
  //       return toast.error("Fix errors before publishing");
  //     }

  //     let id = courseId;
  //     if (!isEditMode) {
  //       const created = await createCourseMutation.mutateAsync(data);
  //       id = created.id;
  //     } else {
  // const valid = await methods.trigger();
  //     if (!valid) {
  //       scrollToFirstError(methods.formState.errors);
  //       return toast.error("Fix errors before publishing");
  //     }
  //       await updateCourseMutation.mutateAsync({ id: courseId, data });
  //     }

  //     // Only call publish endpoint if course is not published yet
  //     if (status !== "PUBLISHED") {
  //       await publishCourseMutation.mutateAsync(id);
  //     }

  //     setStatus("PUBLISHED");
  //     toast.success("Course published");
  //     navigate(paths.app.instructorDashboard.courses.getHref());
  //   } catch (err) {
  //     toast.error(err.message || "Publish failed");
  //   }
  // };

  const onPublish = async (data) => {
    try {
      setPublishing(true);
       
      applyValidationSchema(coursePublishSchema);
      const valid = await methods.trigger();
      if (!valid) {
        scrollToFirstError(methods.formState.errors);
        return toast.error("Fix errors before publishing");
      }

      let id = courseId;
      if (!isEditMode) {
        const created = await createCourseMutation.mutateAsync(data);
        id = created.id;
      } else {
        // Update the course data first
        const valid = await methods.trigger();
        if (!valid) {
          scrollToFirstError(methods.formState.errors);
          return toast.error("Fix errors before republishing");
        }
        await updateCourseMutation.mutateAsync({ id: courseId, data });
      }

      // Publish by updating course status & publishedAt
      if (status !== "PUBLISHED") {
        await publishCourseMutation.mutateAsync({
          id,
          data: {
            ...methods.getValues(),
            status: "PUBLISHED",
            publishedAt: new Date().toISOString(),
          },
        });
      }

      setStatus("PUBLISHED");
      toast.success("Course published");
      navigate(paths.app.instructorDashboard.courses.getHref());
    } catch (err) {
      toast.error(err.message || "Publish failed");
    }
    finally {
    setPublishing(false);
  }
  };

  const applyValidationSchema = (schema) => {
    methods.reset(methods.getValues(), {
      keepDirty: true,
      keepTouched: true,
      keepErrors: true,
      keepIsValid: true,
      keepSubmitCount: true,
    });
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

  return (
    <FormProvider {...methods}>
      <form className="space-y-6 px-4 " noValidate>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Edit Course" : "Add Course"}
          </h1>
          <div className="flex gap-2">
            {status !== "PUBLISHED" ? (
              <>
                <Button onClick={handleSubmit(onSaveDraft)} className="cursor-pointer" disabled={savingDraft||publishing} >
                  {savingDraft ? "Saving..." : "Save as Draft"}
                </Button>
                <Button variant="outline" onClick={handleSubmit(onPublish)} className="cursor-pointer" disabled={publishing||savingDraft}>
                  {publishing ? "Publishing..." : "Publish Course"}
                  
                </Button>
              </>
            ) : (
              <Button onClick={handleSubmit(onPublish)} className="cursor-pointer" disabled={publishing}>
                {publishing ? "Updating..." : "Update Course"}</Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicFields />
          <LessonFields />
        </div>
      </form>
    </FormProvider>
  );
};

export default CourseForm;
