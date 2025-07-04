import { z } from "zod";

export const courseDraftSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  thumbnailUrl: z.string().url("Thumbnail must be a valid image URL"),
  status: z.literal("DRAFT"),
  // Other fields are optional or minimal validation
  description: z.string().optional(),
  category: z.string().optional(),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  price: z.number().min(0).optional(),
  learningObjectives: z.array(z.string()).optional(),
  lessons: z.array(
    z.object({
      title: z.string().optional(),
      contentType: z.enum(["VIDEO", "TEXT"]).optional(),
      content: z.string().optional(),
      sequence: z.number().optional(),
      thumbnailUrl: z.string().url().optional(),
    })
  ).optional(),
});


export const coursePublishSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], "Select a valid level"),
  status: z.literal("PUBLISHED"),
  price: z.number().min(0, "Price cannot be negative"),
  thumbnailUrl: z.string().url("Thumbnail must be a valid image URL"),
  learningObjectives: z.array(z.string().min(5, "Objective must be at least 5 characters"))
    .min(1, "At least one learning objective is required"),
  lessons: z.array(
    z.object({
      title: z.string().min(3, "Lesson title is required"),
      contentType: z.enum(["VIDEO", "TEXT"]),
      content: z.string().min(1, "Content is required"),
      sequence: z.number().min(1),
      thumbnailUrl: z.string().url("Lesson thumbnail must be a valid URL").optional(),
    })
  )
  .min(1, "At least one lesson is required")
  .superRefine((lessons, ctx) => {
    lessons.forEach((lesson, index) => {
      if (lesson.contentType === "VIDEO") {
        try {
          new URL(lesson.content);
        } catch {
          ctx.addIssue({
            path: [index, "content"],
            code: z.ZodIssueCode.custom,
            message: "Video URL must be a valid URL",
          });
        }
      } else if (lesson.contentType === "TEXT") {
        if (lesson.content.trim().length < 5) {
          ctx.addIssue({
            path: [index, "content"],
            code: z.ZodIssueCode.too_small,
            minimum: 5,
            type: "string",
            inclusive: true,
            message: "Text content must be at least 5 characters",
          });
        }
      }
    });
  }),
});
