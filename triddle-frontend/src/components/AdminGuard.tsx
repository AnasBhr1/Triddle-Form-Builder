import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { PageLoading } from './ui/PageLoading';
import { UserRole } from '../store/toast';

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { user, isAuthenticated, isInitialized, isLoading } = useAuthStore();

  if (!isInitialized || isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated || !user || user.role !== UserRole.ADMIN) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};