import api from "../axiosClient";

// For multipart/form-data
export const createCourse = async (courseData) => {
  const formData = new FormData();

  formData.append("title", courseData.title);
  formData.append("subtitle", courseData.subtitle);
  formData.append("description", courseData.description);
  formData.append("level", courseData.level);
  formData.append("category", courseData.category);
  formData.append("price", courseData.price);
  formData.append("thumbnail", courseData.thumbnail);
  formData.append("status", courseData.status);


  courseData.chapters.forEach((chapter, chapterIndex) => {
    formData.append(`chapters[${chapterIndex}][title]`, chapter.title);
    chapter.lessons.forEach((lesson, lessonIndex) => {
      formData.append(`chapters[${chapterIndex}][lessons][${lessonIndex}][title]`, lesson.title);
      formData.append(`chapters[${chapterIndex}][lessons][${lessonIndex}][videoUrl]`, lesson.videoUrl);
      if (lesson.attachment) {
        formData.append(
          `chapters[${chapterIndex}][lessons][${lessonIndex}][attachment]`,
          lesson.attachment
        );
      }
    });
  });

  return api.post("/courses/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
