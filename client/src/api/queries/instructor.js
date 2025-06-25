
export const getInstructorDashboardStats = async () => {
  await new Promise((res) => setTimeout(res, 500)); 

  return {
    totalCourses: 5,
    totalEnrollments: 126,
    averageRating: 4.3,
  };
};

export const getEnrolledStudents = async () => {
  await new Promise((res) => setTimeout(res, 500));

  return [
    {
      id: 1,
      studentName: "Aditi Rao",
      courseTitle: "JavaScript Basics",
      enrolledAt: "2025-06-20",
    },
    {
      id: 2,
      studentName: "Rahul Mehta",
      courseTitle: "React for Beginners",
      enrolledAt: "2025-06-21",
    },
    {
      id: 3,
      studentName: "Sneha Kapoor",
      courseTitle: "Advanced Java",
      enrolledAt: "2025-06-23",
    },
    {
    id: 4,
    studentName: "Aarav Patel",
    courseTitle: "React Basics",
    enrolledAt: "2024-12-01",
  },
  {
    id: 5,
    studentName: "Bhavish",
    courseTitle: "Spring Boot API",
    enrolledAt: "2025-03-10",
  },    {
    id: 6,
    studentName: "Aanya Singh",
    courseTitle: "React Basics",
    enrolledAt: "2024-12-21",
  },
  {
    id: 7,
    studentName: "Sanya Rao",
    courseTitle: "Spring Boot API",
    enrolledAt: "2025-01-10",
  },
  ];
};
