
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
  {
    id: 8,
    studentName: "Sanya Rao",
    courseTitle: "Spring Boot API",
    enrolledAt: "2025-01-10",
  },{
    id: 9,
    studentName: "Sanya Rao",
    courseTitle: "Spring Boot API",
    enrolledAt: "2025-01-10",
  },
  ];
};

export const getInstructorCourses = async () => {
  // mock API delay
  await new Promise((res) => setTimeout(res, 500));

  return [
    {
      id: 1,
      title: "React for Beginners",
      studentCount: 42,
      status: "Published",
      publishedAt: "2024-10-05",
    },
    {
      id: 2,
      title: "Advanced Spring Boot",
      studentCount: 28,
      status: "Draft",
      publishedAt: "2024-06-02",
    },
    {
      id: 3,
      title: "JS for Beginners",
      studentCount: 2,
      status: "Published",
      publishedAt: "2024-8-05",
    },
    {
      id: 4,
      title: "Advanced MERN",
      studentCount: 8,
      status: "Draft",
      publishedAt: "2025-06-02",
    },
    {
      id: 5,
      title: "TypeScript for Beginners",
      studentCount: 4,
      status: "Published",
      publishedAt: "2024-10-25",
    },
    {
      id: 6,
      title: "Advanced Java",
      studentCount: 28,
      status: "Draft",
      publishedAt: "2025-06-09",
    },
    // Add more mock courses
  ];
};
