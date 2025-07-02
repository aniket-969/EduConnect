import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import RichTextEditor from "../common/RichTextEditor";
import ChapterList from "./ChapterList";

const levels = ["Beginner", "Intermediate", "Expert"];
const categories = ["Web Development", "Data Science", "AI", "Cloud", "Others"];

export default function AddNewCourse() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [errors, setErrors] = useState({});
  const thumbnailInputRef = useRef(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        thumbnail: "Thumbnail must be a JPEG, PNG, or GIF image.",
      }));
      return;
    }

    const maxSizeMB = 2;
    if (file.size / 1024 / 1024 > maxSizeMB) {
      setErrors((prev) => ({
        ...prev,
        thumbnail: `Thumbnail size must be less than ${maxSizeMB} MB.`,
      }));
      return;
    }

    setThumbnail(file);
    setErrors((prev) => ({ ...prev, thumbnail: null }));
  };

  const addChapter = () => {
    setChapters((prev) => [
      ...prev,
      { id: Date.now().toString(), title: "", lessons: [] },
    ]);
  };

  const updateChapterTitle = (chapterId, newTitle) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, title: newTitle } : chapter
      )
    );
  };

  const removeChapter = (chapterId) => {
    setChapters((prev) => prev.filter((chapter) => chapter.id !== chapterId));
  };

  const addLesson = (chapterId) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lessons: [
                ...chapter.lessons,
                {
                  id: Date.now().toString(),
                  title: "",
                  videoUrl: "",
                  attachment: null,
                },
              ],
            }
          : chapter
      )
    );
  };

  const updateLessonField = (chapterId, lessonId, field, value) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lessons: chapter.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
              ),
            }
          : chapter
      )
    );
  };

  const removeLesson = (chapterId, lessonId) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lessons: chapter.lessons.filter(
                (lesson) => lesson.id !== lessonId
              ),
            }
          : chapter
      )
    );
  };

  const handleLessonAttachmentChange = (chapterId, lessonId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [`chapters.${chapterId}.lessons.${lessonId}.attachment`]:
          "Attachment must be PDF, Word, or image.",
      }));
      return;
    }

    const maxSizeMB = 5;
    if (file.size / 1024 / 1024 > maxSizeMB) {
      setErrors((prev) => ({
        ...prev,
        [`chapters.${chapterId}.lessons.${lessonId}.attachment`]: `Attachment must be < ${maxSizeMB}MB.`,
      }));
      return;
    }

    updateLessonField(chapterId, lessonId, "attachment", file);
    setErrors((prev) => {
      const newErr = { ...prev };
      delete newErr[`chapters.${chapterId}.lessons.${lessonId}.attachment`];
      return newErr;
    });
  };

  // Handle reorder of lessons inside a chapter
  const reorderLessons = (chapterId, oldIndex, newIndex) => {
    setChapters((prev) =>
      prev.map((chapter) => {
        if (chapter.id !== chapterId) return chapter;
        const updatedLessons = [...chapter.lessons];
        const [moved] = updatedLessons.splice(oldIndex, 1);
        updatedLessons.splice(newIndex, 0, moved);
        return { ...chapter, lessons: updatedLessons };
      })
    );
  };

  // Validate form fields before publishing
  const validateForm = () => {
    let newErrors = {};

    if (title.trim().length < 5)
      newErrors.title = "Title must be at least 5 characters.";
    if (subtitle.trim().length < 5)
      newErrors.subtitle = "Subtitle must be at least 5 characters.";

    const maxLength = 100;
    if (title.length > maxLength)
      newErrors.title = `Title can't be longer than ${maxLength} characters.`;
    if (subtitle.length > maxLength)
      newErrors.subtitle = `Subtitle can't be longer than ${maxLength} characters.`;

    if (!description || description.trim().length < 20)
      newErrors.description = "Title must be at least 20 characters.";
    if (!level) newErrors.level = "Please select a level.";
    if (!category) newErrors.category = "Please select a category.";
    if (!price || isNaN(price) || Number(price) < 0)
      newErrors.price = "Enter valid price.";
    if (!thumbnail) newErrors.thumbnail = "Please upload a course thumbnail.";

    if (chapters.length === 0) newErrors.chapters = "Add at least one chapter.";

    // Check duplicate chapter titles once here
    const chapterTitles = chapters.map((c) => c.title.trim().toLowerCase());
    const uniqueChapterTitles = new Set(chapterTitles);
    if (uniqueChapterTitles.size !== chapterTitles.length) {
      newErrors.duplicateChapters = "Duplicate chapter titles detected.";
    }

    chapters.forEach((chapter, chapterIndex) => {
      if (!chapter.title.trim())
        newErrors[`chapters.${chapterIndex}.title`] =
          "Chapter title can't be empty.";
      if (chapter.lessons.length === 0)
        newErrors[`chapters.${chapterIndex}.lessons`] =
          "Each chapter must have at least one lesson.";

      // Duplicate lesson titles inside this chapter
      const lessonTitles = chapter.lessons.map((l) =>
        l.title.trim().toLowerCase()
      );
      const uniqueLessonTitles = new Set(lessonTitles);
      if (uniqueLessonTitles.size !== lessonTitles.length) {
        newErrors[`chapters.${chapterIndex}.duplicateLessons`] =
          `Duplicate lesson titles detected in chapter "${chapter.title}".`;
      }

      chapter.lessons.forEach((lesson, lessonIndex) => {
        if (!lesson.title.trim())
          newErrors[`chapters.${chapterIndex}.lessons.${lessonIndex}.title`] =
            "Lesson title can't be empty.";
        if (!lesson.videoUrl.trim())
          newErrors[
            `chapters.${chapterIndex}.lessons.${lessonIndex}.videoUrl`
          ] = "Lesson video URL can't be empty.";

        const urlPattern = /^(http|https):\/\/[^ "]+$/;
        if (!urlPattern.test(lesson.videoUrl.trim()))
          newErrors[
            `chapters.${chapterIndex}.lessons.${lessonIndex}.videoUrl`
          ] = "Enter a valid video URL (must start with http or https).";
      });
    });

    setErrors(newErrors);
    return newErrors;
  };
  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setDescription("");
    setLevel("");
    setCategory("");
    setPrice("");
    setThumbnail(null);
    setChapters([]);
    setErrors({});
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  const handlePublish = () => {
    const newErrors = validateForm(); // capture the new error object
    const isValid = Object.keys(newErrors).length === 0;

    if (isValid) {
      toast.success("Course published");
      resetForm();
      // Log basic fields
      console.log("Course Title:", title);
      console.log("Subtitle:", subtitle);
      console.log("Description:", description);
      console.log("Level:", level);
      console.log("Category:", category);
      console.log("Price:", price);
      console.log("Thumbnail File:", thumbnail?.name || "None");

      // Log chapters and lessons
      console.log("Chapters:");
      chapters.forEach((chapter, cIdx) => {
        console.log(`  Chapter ${cIdx + 1}: ${chapter.title}`);
        chapter.lessons.forEach((lesson, lIdx) => {
          console.log(`    Lesson ${lIdx + 1}:`);
          console.log(`      Title: ${lesson.title}`);
          console.log(`      Video URL: ${lesson.videoUrl}`);
          console.log(`      Attachment: ${lesson.attachment?.name || "None"}`);
        });
      });
    } else {
      setTimeout(() => {
        const firstErrorKey = Object.keys(newErrors)[0];
        const el = document.querySelector(
          `[data-error-key="${firstErrorKey}"]`
        );
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus();
        }
      }, 0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 shadow rounded-md">
      <h2 className="text-3xl font-bold mb-4 flex justify-between items-center">
        Add New Course
        <Button onClick={handlePublish} size="sm">
          Publish
        </Button>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          <Input
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-error-key="title"
          />
          {errors.title && (
            <p className="text-red-600 text-sm -mt-4">{errors.title}</p>
          )}

          <Input
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            data-error-key="subtitle"
          />
          {errors.subtitle && (
            <p className="text-red-600 text-sm -mt-4">{errors.subtitle}</p>
          )}

          <div>
            <label className="block font-medium mb-2">Course Description</label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              data-error-key="description"
            />
          </div>
          {errors.description && (
            <p className="text-red-600 text-sm -mt-4">{errors.description}</p>
          )}

          <div className="flex flex-wrap gap-4">
            {levels.map((lvl) => (
              <label
                key={lvl}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="level"
                  value={lvl}
                  checked={level === lvl}
                  onChange={(e) => setLevel(e.target.value)}
                  className="cursor-pointer"
                  data-error-key="level"
                />
                {lvl}
              </label>
            ))}
          </div>
          {errors.level && (
            <p className="text-red-600 text-sm -mt-4">{errors.level}</p>
          )}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            data-error-key="category"
          >
            <option value="" className="bg-primary">
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-background">
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm -mt-4">{errors.category}</p>
          )}

          <Input
            type="number"
            placeholder="Course Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
            data-error-key="price"
          />
          {errors.price && (
            <p className="text-red-600 text-sm -mt-4">{errors.price}</p>
          )}

          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              ref={thumbnailInputRef}
              onChange={handleThumbnailChange}
              className="file:mr-4 file:font-normal file:text-gray-500 "
              data-error-key="thumbnail"
            />
            {thumbnail && (
              
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="Preview"
                  className="w-32 h-20 object-cover"
                />
              
            )}
          </div>
          {thumbnail&& (
            <div className="flex items-center space-x-2 -mt-10 ">
              <p className="text-xs text-muted-foreground">
                {thumbnail.name}
              </p>
              <button
                type="button"
                onClick={() => {
                    setThumbnail(null);
                    thumbnailInputRef.current.value = null; // resets file input
                  }}
                className="text-red-500 hover:text-red-700 font-bold"
                aria-label="Remove attachment"
                title="Remove attachment"
              >
                ✕
              </button>
            </div>
          )}

          {errors.thumbnail && (
            <p className="text-red-600 text-sm -mt-4">{errors.thumbnail}</p>
          )}
        </div>

        {/* Right Column */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-semibold">Chapters & Lessons</h3>
            <Button onClick={addChapter} size="sm" data-error-key="chapters">
              + Add Chapter
            </Button>
          </div>
          {errors.chapters && (
            <p className="text-sm text-red-600 -mt-4">{errors.chapters}</p>
          )}
          {errors.duplicateChapters && (
            <p
              className="text-sm text-red-600 -mt-4"
              data-error-key="duplicateChapters"
            >
              {errors.duplicateChapters}
            </p>
          )}

          <ChapterList
            chapters={chapters}
            setChapters={setChapters}
            errors={errors}
            updateChapterTitle={updateChapterTitle}
            removeChapter={removeChapter}
            addLesson={addLesson}
            updateLessonField={updateLessonField}
            removeLesson={removeLesson}
            handleLessonAttachmentChange={handleLessonAttachmentChange}
            reorderLessons={reorderLessons}
          />
        </div>
      </div>
    </div>
  );
}
