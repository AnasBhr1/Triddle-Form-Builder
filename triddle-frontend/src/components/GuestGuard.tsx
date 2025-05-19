import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { PageLoading } from './ui/PageLoading';

interface GuestGuardProps {
  children: React.ReactNode;
}

export const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated, isInitialized, isLoading } = useAuthStore();
  const location = useLocation();
  
  if (!isInitialized || isLoading) {
    return <PageLoading />;
  }

  if (isAuthenticated) {
    // Redirect to the intended page if coming from somewhere else
    const { from } = location.state || { from: { pathname: '/dashboard' } };
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};