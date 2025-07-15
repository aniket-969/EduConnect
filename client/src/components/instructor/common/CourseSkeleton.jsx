import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function CourseSkeleton({ count = 4 }) {
  const skeletons = Array(count).fill(null);

  return (
    <div className="my-3">
                        <div className="h-5 w-1/4 bg-accent/5 rounded " />

      <Carousel className="min-w-full xl:w-[74rem] lg:w-[56rem] md:w-[38rem] max-w-[18rem] ml-1">
        <CarouselContent className="p-4">
          {skeletons.map((_, i) => (
            <CarouselItem
              key={i}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2 pt-4"
            >
              <Card className="rounded-lg overflow-hidden shadow h-full flex flex-col animate-pulse">
                {/* Thumbnail */}
                <div className="w-full h-40 object-cover bg-accent/5 -mt-6" />
                <CardContent className="flex flex-col flex-grow gap-2 pt-2">
                  {/* Title */}
                  <div className="h-5 w-3/4 bg-accent/5 rounded " />
                  {/* Badges */}
                  <div className="flex gap-2  -mt-1">
                    <div className="h-4 w-16 bg-accent/5 rounded" />
                    <div className="h-4 w-12 bg-accent/5 rounded" />
                  </div>
                  {/* Info Row */}
                  <div className="flex gap-4">
                    <div className="h-4 w-12 bg-accent/5 rounded" />
                    <div className="h-4 w-16 bg-accent/5 rounded" />
                  </div>
                  {/* Date and Actions */}
                  <div className="mt-auto flex justify-between items-center -mb-2">
                    <div className="h-3 w-20 bg-accent/5 rounded" />
                    <div className="flex gap-3">
                      <div className="w-5 h-5 bg-accent/5 rounded" />
                      <div className="w-5 h-5 bg-accent/5 rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

      </Carousel>
    </div>
  );
}