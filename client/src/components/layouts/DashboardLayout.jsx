import React, { useMemo } from 'react';
import { Navigate, Outlet, useRouteError } from 'react-router-dom';
import  AppSidebar  from '@/components/layouts/Sidebar';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { useAuth } from '@/hooks/useAuth';

export function ErrorBoundary() {
  const error = useRouteError();
  console.error("Dashboard Error:", error);
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">
        Something went wrong in the dashboard.
      </h2>
      <pre className="whitespace-pre-wrap text-sm text-red-600">
        {error.message ?? JSON.stringify(error)}
      </pre>
    </div>
  );
}

export default function DashboardLayout() {
  
  const {session} = useAuth()
    if(session.isLoading) return <Spinner/>
    if(session.isError)return <>Something went wrong , please refresh</>

// console.log(session.data)
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar user={session.data} />
        <main className="flex-1 p-6 relative">
          <SidebarTrigger className="md:hidden absolute top-4 left-4 z-10" />
          <div className="pt-5">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
