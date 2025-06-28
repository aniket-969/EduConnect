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
  const { session } = useAuth();
  const user = session.data;
  // choose based on role
  const to =
    user.role === "instructor"
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
      // public routes
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

      // protected /app routes
      {
        path: paths.app.root.path, // "/app"
        element: <ProtectedRoute />,
        ErrorBoundary: AppRootErrorBoundary,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              // redirect index "/app" → "/app/student" or "/app/instructor"
              { index: true, element: <RoleRedirector /> },

              // student dashboard
           {
  path: paths.app.studentDashboard.path,  // "student"
  children: [
    {
      index: true,
      lazy: () => import("./routes/app/studentDashboard").then(c),
    },
    {
      path: paths.app.studentDashboard.profile.path, // "profile"
      lazy: () => import("./routes/app/student/profile").then(c),
    },
  ],
},
              // instructor dashboard
              {
                path: paths.app.instructorDashboard.path,
                lazy: () => import("./routes/app/instructorDashboard").then(c),
              },
              {
                path: paths.app.enrolledStudents.path,
                lazy: () => import("./routes/app/instructor/enrolledStudents.jsx").then(c),
              },
              {
                path: paths.app.myCourses.path,
                lazy: () => import("./routes/app/instructor/myCourses.jsx").then(c),
              },
            ],
          },
        ],
      },

      // catch-all 404
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
