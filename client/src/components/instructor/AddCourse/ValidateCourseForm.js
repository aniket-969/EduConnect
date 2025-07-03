

export const ValidateCourseForm = ({
  title,
  subtitle,
  description,
  level,
  category,
  price,
  thumbnail,
  chapters,
}) => {
  const errors = {};

  // Basic text fields
  if (!title || title.trim().length < 5)
    errors.title = "Title must be at least 5 characters.";
  if (title.length > 100)
    errors.title = "Title can't be longer than 100 characters.";

  if (!subtitle || subtitle.trim().length < 5)
    errors.subtitle = "Subtitle must be at least 5 characters.";
  if (subtitle.length > 100)
    errors.subtitle = "Subtitle can't be longer than 100 characters.";

  if (!description || description.trim().length < 20)
    errors.description = "Title must be at least 20 characters.";

  // Select options
  if (!level) errors.level = "Please select a level.";
  if (!category) errors.category = "Please select a category.";

  // Price
  if (!price || isNaN(price) || Number(price) < 0)
    errors.price = "Enter valid price.";

  // Thumbnail
  if (!thumbnail) errors.thumbnail = "Please upload a course thumbnail.";

  // Chapters
  if (!chapters || chapters.length === 0)
    errors.chapters = "Add at least one chapter.";

  const chapterTitles = chapters.map((c) => c.title.trim().toLowerCase());
  const uniqueChapterTitles = new Set(chapterTitles);
  if (uniqueChapterTitles.size !== chapterTitles.length) {
    errors.duplicateChapters = "Duplicate chapter titles detected.";
  }

  // Per chapter and per lesson
  chapters.forEach((chapter, chapterIndex) => {
    if (!chapter.title.trim()) {
      errors[`chapters.${chapterIndex}.title`] = "Chapter title can't be empty.";
    }

    if (!chapter.lessons || chapter.lessons.length === 0) {
      errors[`chapters.${chapterIndex}.lessons`] = "Each chapter must have at least one lesson.";
    }

    const lessonTitles = chapter.lessons.map((l) => l.title.trim().toLowerCase());
    const uniqueLessonTitles = new Set(lessonTitles);
    if (uniqueLessonTitles.size !== lessonTitles.length) {
      errors[`chapters.${chapterIndex}.duplicateLessons`] = `Duplicate lesson titles in chapter "${chapter.title}".`;
    }

    chapter.lessons.forEach((lesson, lessonIndex) => {
      if (!lesson.title.trim()) {
        errors[`chapters.${chapterIndex}.lessons.${lessonIndex}.title`] = "Lesson title can't be empty.";
      }

      if (!lesson.videoUrl.trim()) {
        errors[`chapters.${chapterIndex}.lessons.${lessonIndex}.videoUrl`] = "Lesson video URL can't be empty.";
      } else {
        const urlPattern = /^(http|https):\/\/[^ "]+$/;
        if (!urlPattern.test(lesson.videoUrl.trim())) {
          errors[`chapters.${chapterIndex}.lessons.${lessonIndex}.videoUrl`] = "Enter a valid video URL (must start with http or https).";
        }
      }
    });
  });

  return errors;
};
