import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { paths } from '@/config/paths';
import { Spinner } from '@/components/ui/spinner';

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { session } = useAuth();

  if (session.isLoading) {
    <Spinner/>
    return null;
  }

  const user = session.data;
  if (!user) {

   const loginPath = paths.auth.login.getHref(location.pathname);
    console.log("Redirecting to:", loginPath);
    return <Navigate to={loginPath} replace />;
  }

  // at /app, send them to role‐specific dashboard
  if (location.pathname === '/app' || location.pathname === '/app/') {
    if (user.role === 'instructor') {
      return (
        <Navigate
          to={paths.app.instructorDashboard.getHref()}
          replace
        />
      );
    }
    if (user.role === 'student') {
      return (
        <Navigate
          to={paths.app.studentDashboard.getHref()}
          replace
        />
      );
    }
  }

  // Otherwise, render child route 
  return children;
};
