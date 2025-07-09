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
<<<<<<< HEAD
=======
      addcourses: {
        path: "courses/new",
        getHref: () => "/app/instructor/courses/new",
      },
      editcourses: {
        path: "courses/:courseId/edit",
        getHref: (id) => `/app/instructor/courses/${id}/edit`,
      },
>>>>>>> temp-merge
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

        // 1. Course List (exactly /app/student/courses)
        list: {
          path: "",
          getHref: () => "/app/student/courses",
        },

        // 2. Course Detail / Overview (e.g. /app/student/courses/123)
        detail: {
          path: ":courseId",
          getHref: (id) => `/app/student/courses/${id}`,

          // 3. Learn (protected) nested under detail (e.g. /app/student/courses/123/learn)
          learn: {
            path: "learn",
            getHref: (id) => `/app/student/courses/${id}/learn`,
          },
        },
      },
    },
  },
};
