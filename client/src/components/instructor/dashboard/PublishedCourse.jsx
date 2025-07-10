import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import PublishedCourseCard from "../course/PublishedCourseCard";

export default function PublishedCoursesCarousel({ courses }) {
  if (!courses || courses.length === 0) return null;

  return (
    <div >
      

      <Carousel className="min-w-full xl:w-[74rem] lg:w-[56rem] md:w-[38rem] max-w-[18rem]">
        <CarouselContent>
          {courses.map((course) => (
            <CarouselItem
              key={course.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-3">
                <PublishedCourseCard course={course} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className={`text-foreground border-2 border-foreground ${courses.length <= 1 ? "invisible" : ""} -left-1`}
        />
        <CarouselNext
          className={`text-foreground border-2 border-foreground ${courses.length <= 1 ? "invisible" : ""} -right-1`}
        />
      </Carousel>
    </div>
  );
}
