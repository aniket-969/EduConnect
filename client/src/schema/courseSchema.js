// src/schema/courseSchema.js
import { z } from "zod";



export const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  type: z.enum(["VIDEO", "TEXT"], {
  errorMap: () => ({ message: "Lesson type is required" }),
}),
  videoUrl: z.string().trim().optional(),
  content: z.string().trim().optional(),
}).superRefine((lesson, ctx) => {
  if (lesson.type === "VIDEO") {
    if (!lesson.videoUrl || lesson.videoUrl.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Video URL is required for VIDEO lessons",
        path: ["videoUrl"],
      });
    } else {
      // Validate if it's a valid URL
      try {
        new URL(lesson.videoUrl);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Video URL must be a valid URL",
          path: ["videoUrl"],
        });
      }
    }

    // Content must be blank
    if (lesson.content && lesson.content.trim().length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Content must be empty for VIDEO lessons",
        path: ["content"],
      });
    }
  }

  if (lesson.type === "TEXT") {
    if (!lesson.content || lesson.content.trim().length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Content is required and must be at least 10 characters for TEXT lessons",
        path: ["content"],
      });
    }

    // Video URL must be blank
    if (lesson.videoUrl && lesson.videoUrl.trim().length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Video URL must be empty for TEXT lessons",
        path: ["videoUrl"],
      });
    }
  }
});



export const courseDraftSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  thumbnail: z
    .any()
    .refine((file) => file instanceof File, "Thumbnail image is required"),
})
 .passthrough();
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
