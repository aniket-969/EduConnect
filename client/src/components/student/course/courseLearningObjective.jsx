import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';


export default function CourseLearningObjectives({ objectives }) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">What You’ll Learn</h2>
        <ul className="space-y-2">
          {objectives.map((obj, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-1" />
              <span className="text-sm text-muted-foreground">{obj}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
