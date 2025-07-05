// src/schema/courseSchema.js
import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  type: z.enum(["VIDEO", "TEXT"]),
  videoUrl: z.string().url("Must be a valid URL").optional(),
  content: z.string().min(10, "Content must be at least 10 characters").optional(),
}).refine((lesson) => {
  if (lesson.type === "VIDEO") return !!lesson.videoUrl;
  if (lesson.type === "TEXT") return !!lesson.content && lesson.content.trim().length > 0;
  return false;
}, {
  message: "Video URL or Text content is required based on lesson type",
  path: ["videoUrl", "content"],
});

export const courseDraftSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  thumbnail: z
    .any()
    .refine((file) => file instanceof File, "Thumbnail image is required"),
});

export const coursePublishSchema = courseDraftSchema.extend({
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  level: z.enum(["easy", "intermediate", "hard"], "Level is required"),
  price: z.number().min(0, "Price must be zero or more"),
  learningObjectives: z.array(z.string().min(1, "Objective cannot be empty"))
                       .min(1, "At least one learning objective is required"),

  lessons: z
    .array(lessonSchema)
    .min(1, "At least one lesson is required"),
});
