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

      // Nested instructor routes
      courses: {
        path: "courses",
        getHref: () => "/app/instructor/courses",
      },
      addcourses: {
        path: "courses/new",
        getHref: () => "/app/instructor/courses/new",
      },
      editcourses: {
        path: "courses/:courseId/edit",
        getHref: (id) => `/app/instructor/courses/${id}/edit`,
      },
      enrolledStudents: {
        path: "enrolled-students",
        getHref: () => "/app/instructor/enrolled-students",
      },
    },

    studentDashboard: {
      path: "student",
      getHref: () => "/app/student",

      // Nested student routes
      profile: {
        path: "profile",
        getHref: () => "/app/student/profile",
      },
      courses: {
        path: "courses",
        getHref: () => "/app/student/courses",
      },
    },
  },
};
