import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

export default function CourseSkeleton() {
  const skeletons = Array(3).fill(null);

  return (
    <div className="my-5">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="h-6 w-40 bg-card-foreground/5 animate-pulse" />
      </div>

      <Carousel className="min-w-full xl:w-[74rem] lg:w-[56rem] md:w-[38rem] max-w-[18rem] my-6">
        <CarouselContent className="-ml-4">
          {skeletons.map((_, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-3">
                <div className="rounded-lg overflow-hidden shadow bg-card border border-border">
                  {/* Thumbnail */}
                  <div className="w-full h-38 pt-8 bg-card-foreground/5 animate-pulse" />

                  {/* Content */}
                  <div className="pt-8 pl-4 space-y-2">
                    <div className="h-4 w-3/4 bg-card-foreground/5 animate-pulse pt-2" />
                    <div className="h-3 w-1/2 bg-card-foreground/5 animate-pulse pt-4" />
                    <div className="h-3 w-1/3 bg-card-foreground/5 animate-pulse pt-4" />

                    {/* Action Icons */}
                    <div className="flex justify-end gap-4 pt-2 p-4">
                      <div className="w-5 h-5 bg-card-foreground/5 rounded-sm animate-pulse" />
                      <div className="w-5 h-5 bg-card-foreground/5 rounded-sm animate-pulse" />
                      <div className="w-5 h-5 bg-card-foreground/5 rounded-sm animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-1" />
        <CarouselNext className="right-1" />
      </Carousel>
    </div>
  );
}
