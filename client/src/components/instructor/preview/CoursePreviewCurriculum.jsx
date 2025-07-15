import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

export default function CoursePreviewCurriculum({ lessons }) {
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleToggle = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  if (!lessons || lessons.length === 0) {
    return (
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Curriculum</h2>
          <p className="italic text-muted-foreground">No lessons available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Curriculum</h2>
        <ul className="space-y-2">
          {lessons.map((lesson, i) => {
            const isOpen = openIndexes.includes(i);
            return (
              <li key={lesson.id || i}>
                <Collapsible open={isOpen}>
                  <CollapsibleTrigger
                    className={`w-full flex items-center justify-between text-left font-medium py-2 px-4 rounded border border-muted-foreground/10 bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-colors`}
                    onClick={() => handleToggle(i)}
                  >
                    {/* Arrow on left */}
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 mr-2 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 mr-2 text-primary" />
                    )}
                    <span className="flex-1">
                      {lesson.title || `Lesson ${i + 1}`}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 border border-t-0 border-muted-foreground/20 bg-muted-foreground/5 rounded-b">
                    {lesson.thumbnailUrl ? (
                      <a
                        href={lesson.thumbnailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground underline block hover:text-primary underline-offset-2"
                      >
                        View Lesson Video
                      </a>
                    ) : null}
                    {lesson.content ? (
                      <div
                        className="prose prose-sm max-w-none text-muted-foreground overflow-y-auto scrollbar-thin"
                        style={{
                          maxHeight: 300,
                          whiteSpace: "pre-line",
                          scrollbarColor:
                            "var(--primary) var(--color-foreground)",
                        }}
                      >
                        {lesson.content}
                      </div>
                    ) : !lesson.thumbnailUrl ? (
                      <span className="italic text-muted-foreground">
                        No content
                      </span>
                    ) : null}
                  </CollapsibleContent>
                </Collapsible>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
