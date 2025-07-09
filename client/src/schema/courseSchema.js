// src/schema/courseSchema.js
import { z } from "zod";



export const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  contentType: z.enum(["VIDEO", "TEXT"], {
  errorMap: () => ({ message: "Lesson type is required" }),
}),
  thumbnailUrl: z.string().trim().optional(),
  content: z.string().trim().optional(),
}).superRefine((lesson, ctx) => {
  if (lesson.contentType === "VIDEO") {
    if (!lesson.thumbnailUrl || lesson.thumbnailUrl.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Video URL is required for VIDEO lessons",
        path: ["thumbnailUrl"],
      });
    } else {
      // Validate if it's a valid URL
      try {
        new URL(lesson.thumbnailUrl);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Video URL must be a valid URL",
          path: ["thumbnailUrl"],
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

  if (lesson.contentType === "TEXT") {
    if (!lesson.content || lesson.content.trim().length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Content is required and must be at least 10 characters for TEXT lessons",
        path: ["content"],
      });
    }

    // Video URL must be blank
    if (lesson.thumbnailUrl && lesson.thumbnailUrl.trim().length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Video URL must be empty for TEXT lessons",
        path: ["thumbnailUrl"],
      });
    }
  }
});

 

export const courseDraftSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  thumbnailUrl: z
    .any()
    .refine((file) => file instanceof File, "Thumbnail image is required"),
})
 .passthrough();
export const coursePublishSchema = courseDraftSchema.extend({
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], "Level is required"),
  price: z.number().min(0, "Price must be zero or more"),
  learningObjectives: z.array(z.string().min(1, "Objective cannot be empty"))
                       .min(1, "At least one learning objective is required"),

  lessons: z
    .array(lessonSchema)
    .min(1, "At least one lesson is required"),
});
