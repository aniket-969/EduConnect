import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import DraftedCourseCard from '../course/DraftedCourseCard';

export default function DraftedCoursesCarousel({ courses }) {
  if (!courses || courses.length === 0) return null;

  return (
    <div className="my-5">
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className="font-semibold text-lg">Drafted Courses</h3>
      </div>

      <Carousel className="min-w-full xl:w-[74rem] lg:w-[56rem] md:w-[38rem] max-w-[18rem] my-4">
        <CarouselContent >
          {courses.map((course) => (
            <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-3">
                <DraftedCourseCard course={course} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

  {/* hide arrows if only one */}
             <CarouselPrevious
           className={`text-foreground border-2 border-foreground ${
             courses.length <= 1 ? 'invisible' : ''
           } -left-1`}
         />
         <CarouselNext
           className={` text-foreground border-2 border-foreground ${
             courses.length <= 1 ? 'invisible' : ''
           } -right-1 `}
         />
      </Carousel>
    </div>
  );
}
