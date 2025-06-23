import React from 'react';
import { Outlet } from 'react-router-dom';
import  AppSidebar  from '@/components/layouts/Sidebar';

export function ErrorBoundary() {
  return <div>Something went wrong in the dashboard.</div>;
}

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
