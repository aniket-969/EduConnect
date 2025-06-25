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
    enrolledStudents: {
      path: "enrolled-students",
      getHref: () => "/app/enrolled-students",
    },
    myCourses: {
      path: "instructor/courses",
      getHref: () => "/app/instructor/courses",
    },
  },
};
