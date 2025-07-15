import React from "react";
import { cld } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselBanner({ slides }) {
  return (
    <Carousel className="w-full h-80 relative overflow-hidden ">
      <CarouselContent>
        {slides.map((slide) => {
          const bgUrl = cld(slide.id, { width: 1920, crop: "fill" });
          return (
            <CarouselItem key={slide.id} className="relative w-full h-80 ">
              {/* Background image covers entire slide */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${bgUrl}')` }}
              />
              {/* Slide card overlay on the left */}
              <div className="relative z-10 flex h-full items-center ">
                {/* slide */}
                <Card className="bg-white sm:max-w-md max-w-xs ml-4 shadow-lg  ">
                  <CardContent>
                    <CardTitle className="text-2xl text-primary">
                      {slide.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {slide.description}
                    </CardDescription>
                    <Button asChild className="mt-4">
                      <a href={slide.ctaHref}>{slide.ctaLabel}</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">
        ‹
      </CarouselPrevious>
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">
        ›
      </CarouselNext>
    </Carousel>
  );
}
