import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PageLoading } from '../components/ui';

// Layout components
import { MainLayout, AuthLayout, Header, Sidebar } from '../components/layout';

// Auth pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';

// Protected pages
import DashboardPage from '../pages/DashboardPage';
import FormsPage from '../pages/forms/FormsPage';
import FormBuilderPage from '../pages/forms/FormBuilderPage';
import FormPreviewPage from '../pages/forms/FormPreviewPage';
import FormResponsesPage from '../pages/forms/FormResponsesPage';
import FormSettingsPage from '../pages/forms/FormSettingsPage';

// Public pages
import PublicFormPage from '../pages/PublicFormPage';
import ThankYouPage from '../pages/ThankYouPage';

// Admin pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminFormsPage from '../pages/admin/AdminFormsPage';

// Protected Route component
interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return <PageLoading />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check admin access
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Public Route component (redirects to dashboard if already authenticated)
interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public form routes */}
      <Route path="/f/:slug" element={<PublicFormPage />} />
      <Route path="/f/:slug/thank-you" element={<ThankYouPage />} />

      {/* Auth routes */}
      <Route path="/login" element={
        <PublicRoute>
          <AuthLayout title="Sign in to your account" subtitle="Or create a new account to get started">
            <LoginPage />
          </AuthLayout>
        </PublicRoute>
      } />
      
      <Route path="/register" element={
        <PublicRoute>
          <AuthLayout title="Create your account" subtitle="Already have an account? Sign in">
            <RegisterPage />
          </AuthLayout>
        </PublicRoute>
      } />
      
      <Route path="/forgot-password" element={
        <PublicRoute>
          <AuthLayout title="Reset your password" subtitle="Enter your email to receive reset instructions">
            <ForgotPasswordPage />
          </AuthLayout>
        </PublicRoute>
      } />

      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <MainLayout header={<Header />} sidebar={<Sidebar isOpen={false} onClose={() => {}} />}>
            <DashboardPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/forms" element={
        <ProtectedRoute>
          <MainLayout header={<Header />} sidebar={<Sidebar isOpen={false} onClose={() => {}} />}>
            <FormsPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/form/new" element={
        <ProtectedRoute>
          <MainLayout header={<Header />} sidebar={<Sidebar isOpen={false} onClose={() => {}} />}>
            <FormBuilderPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/form/:id/edit" element={
        <ProtectedRoute>
          <MainLayout header={<Header />} sidebar={<Sidebar isOpen={false} onClose={() => {}} />}>
            <FormBuilderPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/form/:id/preview" element={
        <ProtectedRoute>
          <FormPreviewPage />
        </ProtectedRoute>
      } />

      <Route path="/form/:id/responses" element={
        <ProtectedRoute>
          <MainLayout header={<Header />} sidebar={<Sidebar isOpen={false} onClose={() => {}} />}>
            <FormResponsesPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/form/:id/settings" element={
        <ProtectedRoute>
          <MainLayout header={<Header />} sidebar={<Sidebar isOpen={false} onClose={() => {}} />}>
            <FormSettingsPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute adminOnly>
          <MainLayout header={<Header />} sidebar={<Sidebar isOpen={false} onClose={() => {}} />}>
            <AdminDashboardPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/admin/users" element={
        <ProtectedRoute adminOnly>
          <MainLayout header={<Header />} sidebar={<Sidebar isOpen={false} onClose={() => {}} />}>
            <AdminUsersPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/admin/forms" element={
        <ProtectedRoute adminOnly>
          <MainLayout header={<Header />} sidebar={<Sidebar isOpen={false} onClose={() => {}} />}>
            <AdminFormsPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Default redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;