import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    instructor: "Jane Doe",
    description: "Learn HTML, CSS, JavaScript, and backend technologies to build full web applications.",
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    instructor: "John Smith",
    description: "Master core programming concepts and problem-solving skills for interviews and beyond.",
  },
  {
    id: 3,
    title: "UI/UX Design Basics",
    instructor: "Sarah Lee",
    description: "Understand design principles, user behavior, and tools like Figma to design better interfaces.",
  },
  {
    id: 4,
    title: "Full-Stack Web Development",
    instructor: "Jane Doe",
    description: "Learn HTML, CSS, JavaScript, and backend technologies to build full web applications.",
  },
  {
    id: 5,
    title: "Data Structures & Algorithms",
    instructor: "John Smith",
    description: "Master core programming concepts and problem-solving skills for interviews and beyond.",
  },
  {
    id: 6,
    title: "UI/UX Design Basics",
    instructor: "Sarah Lee",
    description: "Understand design principles, user behavior, and tools like Figma to design better interfaces.",
  },
];

const PopularCourses = () => {
  return (
    <section className="py-10 sm:py-15 px-4 bg-muted/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Popular Courses</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-card border border-border rounded-xl shadow-md p-6 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">{course.title}</h3>
                <p className="text-sm text-muted-foreground">By {course.instructor}</p>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </div>
              <div className="mt-6">
                <Button className="w-full">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
