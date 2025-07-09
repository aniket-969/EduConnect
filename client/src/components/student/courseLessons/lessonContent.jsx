// LessonContent.jsx
import React from "react";

const LessonContent = ({ lesson }) => {
  if (lesson.contentType === "VIDEO") {
    return (
      <div className="aspect-video w-full">
        <iframe
          src={lesson.content}
          title={lesson.title}
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  // TEXT
  return (
    <div className="prose max-w-none">
      {lesson.content.split("\n\n").map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
};

export default LessonContent;
