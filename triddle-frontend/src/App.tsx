import React, { useEffect } from 'react';
import AppRoutes from './routes';
import { ToastContainer } from './components/ui';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    // Check if user is already authenticated on app load
    const initializeAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Auth initialization error:', error);
      }
    };

    initializeAuth();
  }, [checkAuth]);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;