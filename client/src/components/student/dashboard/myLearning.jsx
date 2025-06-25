
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


export default function MyLearningCarousel({ courses = [] }) {
  return (
    <div className="mx-2 my-5">
      {/* Section header */}
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className="font-semibold text-lg">My Learning</h3>
        <Link to="/app/enrolled-courses" className="text-sm text-primary">
          See all
        </Link>
      </div>

      {/* Carousel wrapper */}
      <Carousel className="lg:w-[56rem] md:w-[38rem] w-[18rem] my-4">
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
              className="pl-4 md:basis-1/2 lg:basis-1/3"
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
          } sm:ml-0 ml-4`}
        />
        <CarouselNext
          className={`${
            courses.length <= 1 ? 'invisible' : ''
          } sm:mr-0 mr-4`}
        />
      </Carousel>
    </div>
  );
}
