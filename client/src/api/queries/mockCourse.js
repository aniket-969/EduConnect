let mockCourses = JSON.parse(localStorage.getItem("mockCourses") || "[]");
let idCounter = Number(localStorage.getItem("mockCourseIdCounter") || "1");

const saveMockData = () => {
  localStorage.setItem("mockCourses", JSON.stringify(mockCourses));
  localStorage.setItem("mockCourseIdCounter", String(idCounter));
};
const sanitizeCourseData = (data) => {
  const { thumbnail, ...rest } = data;

  return {
    ...rest,
    thumbnail: thumbnail instanceof File ? { name: thumbnail.name, type: thumbnail.type } : thumbnail,
  };
};


export const createCourse = async (data) => {
  const sanitized = sanitizeCourseData(data);

  const newCourse = {
    id: idCounter++,
    ...sanitized,
    status: "Draft",
    publishedAt: null,
    createdAt: new Date().toISOString(),
  };
  mockCourses.push(newCourse);
  saveMockData();
  return newCourse;
};


export const updateCourse = async (id, updatedData) => {
  const index = mockCourses.findIndex((c) => c.id === Number(id));
  if (index === -1) throw new Error("Course not found");

  const sanitized = sanitizeCourseData(updatedData);

  mockCourses[index] = {
    ...mockCourses[index],
    ...sanitized,
  };
  saveMockData();
  return mockCourses[index];
};


// ✅ Publish
export const publishCourse = async (id) => {
  const course = mockCourses.find((c) => c.id === Number(id));
  if (!course) throw new Error("Course not found");

  if (course.status === "Published") throw new Error("Already published");

  course.status = "Published";
  course.publishedAt = new Date().toISOString();
  saveMockData();
  return course;
};

// ✅ Get
export const getCourseById = async (id) => {
  const course = mockCourses.find((c) => c.id === Number(id));
  if (!course) throw new Error("Course not found");
  return course;
};
