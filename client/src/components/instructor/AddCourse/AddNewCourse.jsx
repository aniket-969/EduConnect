import React, { useState } from "react";
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

const handleThumbnailChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    toast.error("Thumbnail must be a JPEG, PNG, or GIF image.");
    return;
  }

  const maxSizeMB = 2;
  if (file.size / 1024 / 1024 > maxSizeMB) {
    toast.error(`Thumbnail size must be less than ${maxSizeMB} MB.`);
    return;
  }

  setThumbnail(file);
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
    toast.error("Attachment must be PDF, Word, or image file.");
    return;
  }

  const maxSizeMB = 5; // Example max size, adjust as needed
  if (file.size / 1024 / 1024 > maxSizeMB) {
    toast.error(`Attachment size must be less than ${maxSizeMB} MB.`);
    return;
  }

  updateLessonField(chapterId, lessonId, "attachment", file);
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
  if (title.trim().length < 5)
    return toast.error("Title must be at least 5 characters.");
  if (subtitle.trim().length < 5)
    return toast.error("Subtitle must be at least 5 characters.");
  
  const maxLength = 100;
  if (title.length > maxLength)
    return toast.error(`Title can't be longer than ${maxLength} characters.`);
  if (subtitle.length > maxLength)
    return toast.error(`Subtitle can't be longer than ${maxLength} characters.`);

  if (!description || description.trim().length < 20)
    return toast.error("Description too short.");
  if (!level) return toast.error("Please select a level.");
  if (!category) return toast.error("Please select a category.");
  if (!price || isNaN(price) || Number(price) <= 0)
    return toast.error("Enter valid price.");
  
  if (!thumbnail) {
    return toast.error("Please upload a course thumbnail.");
  } 

  if (chapters.length === 0) return toast.error("Add at least one chapter.");

  // Check duplicate chapter titles once here
  const chapterTitles = chapters.map((c) => c.title.trim().toLowerCase());
  const uniqueChapterTitles = new Set(chapterTitles);
  if (uniqueChapterTitles.size !== chapterTitles.length) {
    return toast.error("Duplicate chapter titles detected.");
  }

  for (const chapter of chapters) {
    if (!chapter.title.trim())
      return toast.error("Chapter title can't be empty.");
    if (chapter.lessons.length === 0)
      return toast.error("Each chapter must have at least one lesson.");

    // Duplicate lesson titles inside this chapter
    const lessonTitles = chapter.lessons.map((l) => l.title.trim().toLowerCase());
    const uniqueLessonTitles = new Set(lessonTitles);
    if (uniqueLessonTitles.size !== lessonTitles.length) {
      return toast.error(`Duplicate lesson titles detected in chapter "${chapter.title}".`);
    }

    for (const lesson of chapter.lessons) {
      if (!lesson.title.trim())
        return toast.error("Lesson title can't be empty.");
      if (!lesson.videoUrl.trim())
        return toast.error("Lesson video URL can't be empty.");

      const urlPattern = /^(http|https):\/\/[^ "]+$/;
      if (!urlPattern.test(lesson.videoUrl.trim()))
        return toast.error("Enter a valid video URL (must start with http or https).");

      
      }
    }
  

  return true;
};


  const handlePublish = () => {
    if (validateForm()) {
      toast.success("Course published");
      // Here you can implement actual submit logic
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
          />
          <Input
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <div>
            <label className="block font-medium mb-2">Course Description</label>
            <RichTextEditor value={description} onChange={setDescription} />
          </div>
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
                />
                {lvl}
              </label>
            ))}
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
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
          <Input
            type="number"
            placeholder="Course Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
          />
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="file:mr-4 file:font-normal file:text-gray-500 "
            />
            {thumbnail && (
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="Preview"
                className="w-32 h-20 object-cover rounded"
              />
            )}
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-semibold">Chapters & Lessons</h3>
            <Button onClick={addChapter} size="sm">
              + Add Chapter
            </Button>
          </div>

          <ChapterList
            chapters={chapters}
            setChapters={setChapters}
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
