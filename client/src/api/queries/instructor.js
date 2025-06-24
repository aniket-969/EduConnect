
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
  ];
};
