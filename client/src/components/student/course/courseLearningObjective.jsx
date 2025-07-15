import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';


export default function CourseLearningObjectives({ objectives = [], title = "What You’ll Learn" }) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {objectives.length > 0 ? (
        <ul className="space-y-2">
          {objectives.map((obj, idx) => (
            <li key={idx} className="flex items-start gap-2 ">
              <CheckCircle className=" h-4 w-4 text-primary mt-1 shrink-0" />
              <span className="text-sm text-muted-foreground">{obj}</span>
            </li>
          ))}
        </ul>
        ):(
          <p className="text-muted-foreground italic text-sm">No objectives available.</p>
        )}
      </CardContent>
    </Card>
  );
}
