let mockCourses = [];
let idCounter = 1;

// ✅ Create Course (Draft)
export const createCourse = async (data) => {
  const newCourse = {
    id: idCounter++,
    ...data,
    status: "draft",
    publishedAt: null,
    createdAt: new Date().toISOString(),
  };
  mockCourses.push(newCourse);
  return newCourse;
};

// ✅ Update Course (Draft or Published)
export const updateCourse = async (id, updatedData) => {
  const index = mockCourses.findIndex((c) => c.id === Number(id));
  if (index === -1) throw new Error("Course not found");

  mockCourses[index] = {
    ...mockCourses[index],
    ...updatedData,
  };
  return mockCourses[index];
};

// ✅ Publish Course
export const publishCourse = async (id) => {
  const course = mockCourses.find((c) => c.id === Number(id));
  if (!course) throw new Error("Course not found");

  if (course.status === "published") throw new Error("Already published");

  course.status = "published";
  course.publishedAt = new Date().toISOString();
  return course;
};

// ✅ Get Course By ID
export const getCourseById = async (id) => {
  const course = mockCourses.find((c) => c.id === Number(id));
  if (!course) throw new Error("Course not found");
  return course;
};
