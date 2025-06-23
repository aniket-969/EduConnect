import React from 'react';
import { Outlet } from 'react-router-dom';
import  AppSidebar  from '@/components/layouts/Sidebar';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';

export function ErrorBoundary() {
  return <div>Something went wrong in the dashboard.</div>;
}

export default function DashboardLayout() {
  return (
     <SidebarProvider>
      <div className="min-h-screen flex">
     
        <AppSidebar />

        <main className="flex-1 p-6 relative">
         
          <SidebarTrigger className="md:hidden absolute top-4 left-4 z-10" />

          <div className="pt-10">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
