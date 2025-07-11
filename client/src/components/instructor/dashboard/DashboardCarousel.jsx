import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "@/components/instructor/course/CourseCard";

export default function DashboardCarousel({ courses, type }) {
  // Show only up to 6 cards in the carousel
  const visibleCourses = courses.slice(0, 6);
  return (
    <Carousel className="min-w-full xl:w-[74rem] lg:w-[56rem] md:w-[38rem] max-w-[18rem] ml-1 ">
      <CarouselContent className="p-4">
        {visibleCourses.map((course) => (
          <CarouselItem
            key={course.id}
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2 pt-4"
          >
            <CourseCard
              course={course}
              type={type}
              showEmptyPlaceholders={type === "draft"}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
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
  );
}
