import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { paths } from '@/config/paths';
import AppRoot, { ErrorBoundary as AppRootErrorBoundary } from './routes/app/root';

function convert(queryClient) {
    return (module) => {
    const { clientLoader, clientAction, default: Component, ...rest } = module
    return {
      ...rest,
      loader: clientLoader ? clientLoader(queryClient) : undefined,
      action: clientAction ? clientAction(queryClient) : undefined,
      Component,
    }
  }
}

export function createAppRouter(queryClient) {
  const c = convert(queryClient);

  return createBrowserRouter(
    [
      {
        path: paths.home.path,
        lazy: () => import('./routes/LandingPage.jsx').then(c),
        // route-level fallback
        hydrateFallbackElement: (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        ),
      },
      {
        path: paths.auth.register.path,
        lazy: () => import('./routes/auth/register').then(c),
        hydrateFallbackElement: (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        ),
      },
      {
        path: paths.auth.login.path,
        lazy: () => import('./routes/auth/login').then(c),
        hydrateFallbackElement: (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        ),
      },
      {
        path: '*',
        lazy: () => import('./routes/not-found').then(c),
        hydrateFallbackElement: (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner size="lg" />
          </div>
        ),
      },
    ],
    {
      //  partial hydration
      future: { v7_partialHydration: true },
    }
  );
}

export function AppRouter() {
  const queryClient = useQueryClient();
  const router = React.useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
}
