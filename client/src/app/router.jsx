// src/app/router.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/ProtectedRoute";
import DashboardLayout, {
  ErrorBoundary as AppRootErrorBoundary,
} from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";

function RoleRedirector() {
  const raw = localStorage.getItem("session");
  if (!raw) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(raw);
  } catch {
    return <Navigate to="/login" replace />;
  }
  const to =
    user.role === "INSTRUCTOR"
      ? paths.app.instructorDashboard.getHref()
      : paths.app.studentDashboard.getHref();

  return <Navigate to={to} replace />;
}

function convert(queryClient) {
  return (module) => {
    const { clientLoader, clientAction, default: Component, ...rest } = module;
    return {
      ...rest,
      loader: clientLoader ? clientLoader(queryClient) : undefined,
      action: clientAction ? clientAction(queryClient) : undefined,
      Component,
    };
  };
}

export function createAppRouter(queryClient) {
  const c = convert(queryClient);

  return createBrowserRouter(
    [
      // Public routes
      {
        path: paths.home.path,
        lazy: () => import("./routes/LandingPage.jsx").then(c),
        hydrateFallbackElement: (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        ),
      },
      {
        path: paths.auth.register.path,
        lazy: () => import("./routes/auth/register").then(c),
        hydrateFallbackElement: (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        ),
      },
      {
        path: paths.auth.login.path,
        lazy: () => import("./routes/auth/login").then(c),
        hydrateFallbackElement: (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        ),
      },

      // Protected /app routes
      {
        path: paths.app.root.path, // "/app"
        element: <ProtectedRoute />,
        ErrorBoundary: AppRootErrorBoundary,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              // "/app" → instructor or student
              { index: true, element: <RoleRedirector /> },

              // Student dashboard & sub-routes
              {
                path: paths.app.studentDashboard.path, // "student"
                children: [
                  {
                    index: true,
                    lazy: () => import("./routes/app/studentDashboard").then(c),
                  },
                  {
                    path: paths.app.studentDashboard.profile.path, // "profile"
                    lazy: () => import("./routes/app/student/profile").then(c),
                  },
                  {
                    path: paths.app.studentDashboard.courses.path, // "courses"
                    children: [
                      // 1. Course List at /app/student/courses
                      {
                        index: true,
                        lazy: () =>
                          import("./routes/app/student/courses/index.jsx").then(
                            c
                          ),
                      },

                      // 2. Learn at /app/student/courses/:courseId/learn
                      {
                        path: `${paths.app.studentDashboard.courses.detail.path}/${paths.app.studentDashboard.courses.detail.learn.path}`, // ":courseId/learn"
                        lazy: () =>
                          import(
                            "./routes/app/student/courses/courseLearn.jsx"
                          ).then(c),
                      },

                      // 3. Course Detail at /app/student/courses/:courseId
                      {
                        path: paths.app.studentDashboard.courses.detail.path, // ":courseId"
                        lazy: () =>
                          import(
                            "./routes/app/student/courses/courseDetail.jsx"
                          ).then(c),
                      },
                    ],
                  },
                ],
              },

              // Instructor dashboard & sub-routes
              {
                path: paths.app.instructorDashboard.path, // "instructor"
                children: [
                  {
                    index: true,
                    lazy: () =>
                      import("./routes/app/instructorDashboard").then(c),
                  },
                  {
                    path: paths.app.instructorDashboard.courses.path, // "courses"
                    lazy: () =>
                      import("./routes/app/instructor/myCourses.jsx").then(c),
                  },
                  {
                    path: paths.app.instructorDashboard.enrolledStudents.path, // "enrolled-students"
                    lazy: () =>
                      import(
                        "./routes/app/instructor/enrolledStudents.jsx"
                      ).then(c),
                  },{
                    path: paths.app.instructorDashboard.addcourses.path, // "addcourses"
                    lazy: () =>
                      import("./routes/app/instructor/CourseFormPage.jsx").then(c),
                    
                  },
                  {
                    path: paths.app.instructorDashboard.editcourses.path, // "editcourses"
                    lazy: () =>
                      import("./routes/app/instructor/CourseFormPage.jsx").then(c),
                  },
                  {
                    path: "profile",
                    lazy: () =>
                      import("./routes/app/instructor/profile.jsx").then(c),
                  },
                ],
              },
            ],
          },
        ],
      },

      // Catch-all 404
      {
        path: "*",
        lazy: () => import("./routes/not-found").then(c),
        hydrateFallbackElement: (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        ),
      },
    ],
    {
      future: { v7_partialHydration: true },
    }
  );
}

export function AppRouter() {
  const queryClient = useQueryClient();
  const router = React.useMemo(
    () => createAppRouter(queryClient),
    [queryClient]
  );
  return <RouterProvider router={router} />;
}
