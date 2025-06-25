import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import  AppSidebar  from '@/components/layouts/Sidebar';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { useAuth } from '@/hooks/useAuth';

export function ErrorBoundary() {
  console.log("error boundary")
  return <div>Something went wrong in the dashboard.</div>;
}

export default function DashboardLayout() {
  const { session } = useAuth();
  const user = session.data;
// console.log('in dashboard')
  
  const stableUser = useMemo(() => user, [user?.role]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <AppSidebar user={stableUser} />
        <main className="flex-1 p-6 relative">
          <SidebarTrigger className="md:hidden absolute top-4 left-4 z-10" />
          <div className="pt-5">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );git 
}
