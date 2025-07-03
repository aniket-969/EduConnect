import { z } from "zod";

const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  videoUrl: z.string().url("Must be a valid URL starting with http or https"),
  attachment: z.any().optional(),
});

const chapterSchema = z
  .object({
    title: z.string().min(1, "Chapter title is required"),
    lessons: z
      .array(lessonSchema)
      .min(1, "Each chapter must have at least one lesson"),
  })
  .superRefine((chapter, ctx) => {
    const seen = new Set();
    chapter.lessons.forEach((lesson, index) => {
      const key = lesson.title.trim().toLowerCase();
      if (seen.has(key)) {
        ctx.addIssue({
          path: ["lessons", index, "title"],
          code: z.ZodIssueCode.custom,
          message: "Duplicate lesson title in this chapter",
        });
      } else {
        seen.add(key);
      }
    });
  });

export const CoursePublishedSchema = z
  .object({
    title: z.string().min(5).max(100),
    subtitle: z.string().min(5).max(100),
    description: z.string().min(20),
    level: z.string().min(1, "Please select a level"),
    category: z.string().min(1, "Please select a category"),
    price: z
      .string()
      .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
        message: "Enter a valid price",
      }),
    thumbnail: z.custom((file) => file instanceof File && file.size > 0, {
      message: "Please upload a course thumbnail",
    }),
    status: z.literal("published"),
    chapters: z.array(chapterSchema).min(1, "Add at least one chapter"),
  })
  .superRefine((data, ctx) => {
  const seen = new Set();
  data.chapters.forEach((chapter, index) => {
    const title = chapter.title?.trim().toLowerCase();

    // Skip empty titles – let min(1) handle them
    if (!title) return;

    if (seen.has(title)) {
      ctx.addIssue({
        path: ["chapters", index, "title"],
        code: z.ZodIssueCode.custom,
        message: "Duplicate chapter title",
      });
    } else {
      seen.add(title);
    }
  });
});


// CourseDraftSchema.ts
export const CourseDraftSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  thumbnail: z.custom((file) => file instanceof File && file.size > 0, {
    message: "Please upload a course thumbnail",
  }),
  status: z.literal("draft"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  level: z.string().optional(),
  category: z.string().optional(),
  price: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(+val), {
      message: "Enter a valid price",
    }),
  chapters: z.array(z.any()).optional(),
});

