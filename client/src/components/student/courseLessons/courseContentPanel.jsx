import React from 'react';
import { CheckCircle, Circle, Play } from 'lucide-react';

const CourseContentPanel = ({
  lessons,
  currentLesson,
  onSelectLesson,
  completedLessons,
  onToggleComplete,
}) => {
  const isCompleted = (lessonId) => completedLessons.includes(lessonId);

  return (
    <div className="flex flex-col h-full text-white">
      {/* Lesson list */}
      <div className="overflow-y-auto">
        {lessons.map((section) => (
          <div key={section.sectionTitle} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{section.sectionTitle}</h3>
            <ul className="space-y-2">
              {section.lessons.map((lesson) => {
                const completed = isCompleted(lesson.id);
                const isActive = lesson.id === currentLesson.id;
                return (
                  <li
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson)}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors
                      ${isActive ? 'bg-muted/50' : 'hover:bg-muted/30'}`}
                  >
                    <div className="flex items-center gap-2">
                      {/* Lesson status icon as toggle */}
                      {isActive ? (
                        <Play className="w-5 h-5 text-secondary" />
                      ) : completed ? (
                        <CheckCircle
                          className="w-5 h-5 text-primary cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleComplete(lesson.id);
                            console.log(`Lesson ${lesson.id} marked incomplete`);
                          }}
                        />
                      ) : (
                        <Circle
                          className="w-5 h-5 text-muted cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleComplete(lesson.id);
                            console.log(`Lesson ${lesson.id} marked completed`);
                          }}
                        />
                      )}
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                    <span className="text-sm text-muted">{lesson.duration}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContentPanel;
