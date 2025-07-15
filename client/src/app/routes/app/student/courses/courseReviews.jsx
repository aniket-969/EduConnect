
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';


export default function CourseReviews({ ratings }) {
  if (!ratings || ratings.length === 0) return null;

  // Calculate average rating
  const avg =
    ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
  const roundedAvg = Math.round(avg);
  const formattedAvg = avg.toFixed(1);

  return (
    <Card>
      <CardContent className="space-y-4">
        {/* Section Title */}
        <h2 className="text-xl font-semibold">Reviews & Ratings</h2>

        {/* Average Rating */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{formattedAvg}</span>
          <div className="flex">
            {Array.from({ length: roundedAvg }).map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-500" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({ratings.length} review{ratings.length > 1 ? 's' : ''})
          </span>
        </div>

        {/* Individual Comments */}
        <ul className="space-y-4">
          {ratings.map((r) => (
            <li key={r.id} className="space-y-1">
              <div className="flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{r.comment}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
