import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { paths } from '@/config/paths';
import { Spinner } from '@/components/ui/spinner';

export function ProtectedRoute() {
  const location = useLocation();
  const { session } = useAuth();

  if (session.isLoading) {
    return <Spinner />;
  }
if(session.isError){
  return <>Something went wrong ,Please refresh</>
}
  if (!session.data) {
    console.log("data not found so redirecting")
    const loginPath = paths.auth.login.getHref(location.pathname);
    return 
    return <Navigate to={loginPath} replace />;
  }

  return <Outlet />;
}
