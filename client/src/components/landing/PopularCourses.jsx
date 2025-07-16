import { usePopularCourses } from "@/hooks/useCourse";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PopularCourses = () => {
  const { data: courses, isLoading } = usePopularCourses();
  const navigate = useNavigate();

  return (
    <section className="py-10 sm:py-15 px-4 bg-muted/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Our Popular Courses
        </h2>
        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {courses?.slice(0, 8).map((course) => (
              <Card
  key={course.id}
  className="flex flex-col justify-between h-full hover:scale-[1.02] transition-transform duration-200"
>
  <CardHeader>
    <div className="w-full aspect-video overflow-hidden rounded">
  <img
    src={course.thumbnailUrl || "/placeholder.jpg"}
    alt={course.title}
    className="w-full h-full object-cover"
  />
</div>

    <CardTitle className="text-xl truncate">{course.title}</CardTitle>
  </CardHeader>

  <CardContent className="flex-1 space-y-2">
    <p className="text-sm text-muted-foreground line-clamp-3">
      {course.description}
    </p>

    <div className="flex gap-2 flex-wrap text-xs">
      {course.category && (
        <Badge variant="default">{course.category}</Badge>
      )}
      {course.level && (
        <Badge variant="secondary">
          {course.level.charAt(0) + course.level.slice(1).toLowerCase()}
        </Badge>
      )}
      {course.price !== null &&
        (course.price === "Free" || course.price === 0 ? (
          <Badge variant="outline">Free</Badge>
        ) : typeof course.price === "number" ? (
          <div className="flex items-center gap-1 text-sm">
            <IndianRupee className="w-3 h-3" />
            {course.price}
          </div>
        ) : (
          course.price
        ))}
    </div>
  </CardContent>

 <CardFooter>
  <Link to="/auth/login" className="w-full">
    <Button className="w-full" variant="outline">
      View Details
    </Button>
  </Link>
</CardFooter>

</Card>

            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;
