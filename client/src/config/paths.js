export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    register: {
      path: "/auth/register",
      getHref: (redirectTo) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    login: {
      path: "/auth/login",
      getHref: (redirectTo) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  },

  app: {
    root: {
      path: "/app",
      getHref: () => "/app",
    },
    instructorDashboard: {
      path: "instructor",
      getHref: () => "/app/instructor",
    },
    studentDashboard: {
      path: "student",
      getHref: () => "/app/student",
    },
    addCourse: {
      path: "instructor/add-course",
      getHref: () => "/app/instructor/add-course",
    },
    enrolledStudents: {
      path: "instructor/enrolled-students",
      getHref: () => "/app/instructor/enrolled-students",
    },
    myCourses: {
      path: "instructor/courses",
      getHref: () => "/app/instructor/courses",
    },
  },
};
