import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Lock, Play } from 'lucide-react';

/**
 * Props:
 * - lessons: Array<{ id, title, sequence }>
 * - completedLessonIds: Array<string>
 * - enrolled: boolean
 * - onSelect: (lessonId: string) => void
 */
export default function CourseCurriculum({ lessons, completedLessonIds, enrolled, onSelect }) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Curriculum</h2>
        <ul className="space-y-2">
          {lessons.map((lesson) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const isLocked = !enrolled && !isCompleted;

            let Icon = Play;
            if (isCompleted) Icon = CheckCircle;
            else if (isLocked) Icon = Lock;

            return (
              <li
                key={lesson.id}
                className={`flex items-center justify-between p-3 rounded hover:bg-muted cursor-pointer ${
                  isLocked ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''
                }`}
                onClick={() => !isLocked && onSelect(lesson.id)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{lesson.sequence}. {lesson.title}</span>
                </div>
                {isCompleted && (
                  <span className="text-sm text-green-600">Completed</span>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
