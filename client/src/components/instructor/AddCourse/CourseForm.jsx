import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseDraftSchema, coursePublishSchema } from "@/schema/courseSchema";
import {
  createCourse,
  updateCourse,
  publishCourse,
  getCourseById,
} from "@/api/queries/mockCourse";
import LessonFields from "./LessonFields";
import BasicFields from "./BasicFields";
import { Button } from "@/components/ui/button";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";


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

    handleSubmit,
    reset,
  
  } = methods;


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
const navigate = useNavigate();
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
      navigate(paths.app.instructorDashboard.editcourses.getHref(created.id));
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
        console.log("errrrrrrrrrrr",methods.formState.errors)
        return toast.error("Fix errors before publishing");
      }
      console.log("ci",courseId)

      let id = courseId;
      if (!isEditMode) {
        
        const created = await createCourse(data);
        console.log("data",created)
        id = created.id;
        console.log("iner ci",id)

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
          <BasicFields />
          <LessonFields />
        </div>
      </form>
    </FormProvider>
  );
};

export default CourseForm;
