import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

export default function CourseHero({
  thumbnailUrl,
  title,
  category,
  instructor,
  enrolled,
  price,
  currency,
  onEnroll,
  onGoToCourse,
}) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="space-y-6">
      {/* Banner Image */}
      <div className="relative h-64 w-full rounded-lg overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-4 left-4">{category}</Badge>
      </div>

      {/* Hero Panel */}
      <Card>
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Course & Instructor Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={instructor.avatarUrl} alt={instructor.name} />
              <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-sm text-muted-foreground">
                Instructor: {instructor.name}
              </p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                {instructor.bio.slice(0, 100)}...
              </p>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-xl font-semibold">{formattedPrice}</span>
            {!enrolled ? (
              <Button onClick={onEnroll} icon={ChevronRight}>
                Enroll Now 
              </Button>
            ) : (
              <Button variant="outline" onClick={onGoToCourse} icon={ChevronRight}>
                Go to Course
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
