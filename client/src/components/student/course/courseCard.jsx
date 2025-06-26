
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { cld } from '@/lib/utils';

export default function CourseCard({ course }) {
  const thumb = cld(course.thumbnailId, { width: 400, crop: 'fill' });
  return (
    <Card className="rounded-lg overflow-hidden shadow">
      {/* Thumbnail */}
      <img
        src={thumb}
        alt={course.title}
        className="w-full h-32 object-cover"
      />
      <CardContent className="p-4 space-y-2">
        <h4 className="text-base font-semibold truncate">
          {course.title}
        </h4>
        <p className="text-sm text-gray-500 truncate">
          {course.instructor.name}
        </p>
        {/* Rating */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(course.rating)
                  ? 'text-yellow-500'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-gray-600">
            ({course.rating.toFixed(1)})
          </span>
        </div>
        {/* Price */}
        <div>
          {course.price > 0 ? (
            <span className="font-bold">${course.price}</span>
          ) : (
            <Badge variant="outline">Free</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
