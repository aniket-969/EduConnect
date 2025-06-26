
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import CourseCard from '../course/courseCard';


export default function RecommendedCourses({ courses = [] }) {
  return (
    <div className=" my-5 ">
      {/* Section header */}
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className="font-semibold text-lg">Recommended Courses</h3>
      </div>

      {/* Carousel wrapper */}
      <Carousel className="min-w-full xl:w-[74rem] lg:w-[56rem] md:w-[38rem] max-w-[18rem] my-4 ">
        <CarouselContent
          className={`-ml-4 ${
            courses.length < 3
              ? 'flex justify-center items-center'
              : ''
          }`}
        >
          {courses.map((course) => (
            <CarouselItem
              key={course.id}
              className="md:basis-1/2 lg:basis-1/3  "
            >
              <div className="p-1">
                <CourseCard course={course} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* hide arrows if only one */}
            <CarouselPrevious
          className={`${
            courses.length <= 1 ? 'invisible' : ''
          } left-1 sm:left-2 md:left-4`}
        />
        <CarouselNext
          className={`${
            courses.length <= 1 ? 'invisible' : ''
          } right-1 sm:right-2 md:right-4`}
        />
      </Carousel>
    </div>
  );
}
