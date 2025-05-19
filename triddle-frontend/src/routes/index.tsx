import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

// Layout
import MainLayout from '../components/layout/MainLayout';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import RegisterPageDebug from '../pages/auth/RegisterPageDebug';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

// Test Pages
import ApiTestPage from '../pages/ApiTestPage';
import TokenDebugPage from '../pages/TokenDebugPage';

// Admin Pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminFormsPage from '../pages/admin/AdminFormsPage';

// User Pages
import DashboardPage from '../pages/dashboard/DashboardPage';
import FormsPage from '../pages/forms/FormsPage';
import FormBuilderPage from '../pages/forms/FormBuilderPage';
import FormPreviewPage from '../pages/forms/FormPreviewPage';
import FormResponsesPage from '../pages/forms/FormResponsesPage';
import FormSettingsPage from '../pages/forms/FormSettingsPage';
import ViewFormPage from '../pages/forms/ViewFormPage';
import SubmitSuccessPage from '../pages/forms/SubmitSuccessPage';
import ProfilePage from '../pages/user/ProfilePage';
import SettingsPage from '../pages/user/SettingsPage';

// Error Pages
import NotFoundPage from '../pages/error/NotFoundPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, isInitialized, isLoading } = useAuthStore();
  
  // Wait for auth to initialize
  if (!isInitialized || isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }
  
  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Admin check
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { isAuthenticated, isInitialized, isLoading } = useAuthStore();
  
  // Wait for auth to initialize
  if (!isInitialized || isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }
  
  // Already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Simple placeholder for Analytics page until you build a dedicated component
const AnalyticsPlaceholder: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-400 mb-4">Analytics features coming soon!</p>
      <p className="text-gray-600 dark:text-gray-400">You'll be able to track form submissions, user engagement, and more with detailed charts and reports.</p>
    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirect root to dashboard or login */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Auth Routes (Guest Only) */}
        <Route path="/login" element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        } />
        
        <Route path="/register" element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        } />
        
        <Route path="/register-debug" element={
          <RegisterPageDebug />
        } />
        
        {/* API Testing Route */}
        <Route path="/api-test" element={
          <ApiTestPage />
        } />
        
        {/* Token Debug Route */}
        <Route path="/token-debug" element={
          <TokenDebugPage />
        } />
        
        <Route path="/forgot-password" element={
          <GuestRoute>
            <ForgotPasswordPage />
          </GuestRoute>
        } />
        
        <Route path="/reset-password/:token" element={
          <GuestRoute>
            <ResetPasswordPage />
          </GuestRoute>
        } />
        
        {/* Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        {/* Forms */}
        <Route path="/forms" element={
          <ProtectedRoute>
            <MainLayout>
              <FormsPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/form/new" element={
          <ProtectedRoute>
            <MainLayout>
              <FormBuilderPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/form/:id/edit" element={
          <ProtectedRoute>
            <MainLayout>
              <FormBuilderPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/form/:id/preview" element={
          <ProtectedRoute>
            <MainLayout>
              <FormPreviewPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/form/:id/responses" element={
          <ProtectedRoute>
            <MainLayout>
              <FormResponsesPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/form/:id/settings" element={
          <ProtectedRoute>
            <MainLayout>
              <FormSettingsPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        {/* NEW ROUTES - Start */}
        {/* Main Responses page for all forms */}
        <Route path="/responses" element={
          <ProtectedRoute>
            <MainLayout>
              <FormResponsesPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        {/* Analytics page */}
        <Route path="/analytics" element={
          <ProtectedRoute>
            <MainLayout>
              <AnalyticsPlaceholder />
            </MainLayout>
          </ProtectedRoute>
        } />
        {/* NEW ROUTES - End */}
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute adminOnly>
            <MainLayout>
              <AdminDashboardPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/users" element={
          <ProtectedRoute adminOnly>
            <MainLayout>
              <AdminUsersPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/forms" element={
          <ProtectedRoute adminOnly>
            <MainLayout>
              <AdminFormsPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        {/* User Profile & Settings */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute>
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        {/* Public Form */}
        <Route path="/f/:formId" element={<ViewFormPage />} />
        <Route path="/f/:formId/success" element={<SubmitSuccessPage />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
};

export default AppRoutes;