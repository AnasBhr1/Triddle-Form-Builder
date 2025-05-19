import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/auth';
import { toast } from '../store/toast';
import type { LoginCredentials, RegisterData } from '../types';

// Import AuthService separately to avoid circular dependencies
import { AuthService } from '../services/auth';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isInitialized,
    isLoading,
    setUser,
    setAuthenticated,
    setInitialized,
    setLoading,
    logout: logoutStore
  } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      setLoading(true);
      return AuthService.login(credentials);
    },
    onSuccess: (data) => {
      // Try to extract user data from different response structures
      const userData = data.data?.user || data.user;
      if (userData) {
        setUser(userData);
        setAuthenticated(true);
      }
      setInitialized(true);
      setLoading(false);
      toast.success('Login successful', 'Welcome back!');
    },
    onError: (error: any) => {
      setLoading(false);
      toast.error('Login failed', error instanceof Error ? error.message : 'Please check your credentials and try again');
    }
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => {
      setLoading(true);
      return AuthService.register(data);
    },
    onSuccess: (data) => {
      // Try to extract user data from different response structures
      const userData = data.data?.user || data.user;
      if (userData) {
        setUser(userData);
        setAuthenticated(true);
      }
      setInitialized(true);
      setLoading(false);
      toast.success('Registration successful', 'Your account has been created');
    },
    onError: (error: any) => {
      setLoading(false);
      toast.error('Registration failed', error instanceof Error ? error.message : 'Please check your information and try again');
    }
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => {
      setLoading(true);
      return AuthService.logout();
    },
    onSuccess: () => {
      logoutStore();
      toast.success('Logged out', 'You have been successfully logged out');
    },
    onError: (error: any) => {
      setLoading(false);
      toast.error('Logout failed', error instanceof Error ? error.message : 'An error occurred while logging out');
    }
  });

  // Check auth mutation
  const checkAuthMutation = useMutation({
    mutationFn: () => {
      setLoading(true);
      return AuthService.getCurrentUser();
    },
    onSuccess: (data) => {
      // Try to extract user data from different response structures
      const userData = data.data?.user || data.user;
      if (userData) {
        setUser(userData);
        setAuthenticated(true);
      }
      setInitialized(true);
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      setInitialized(true);
      // Don't show error toast for auth check - it's expected to fail if user is not logged in
    }
  });

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => {
      const data = { email };
      return AuthService.forgotPassword(data);
    },
    onSuccess: () => {
      toast.success('Email sent', 'Check your inbox for password reset instructions');
    },
    onError: (error: any) => {
      toast.error('Failed to send email', error instanceof Error ? error.message : 'An error occurred');
    }
  });

  return {
    user,
    isAuthenticated,
    isInitialized,
    isLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    checkAuth: checkAuthMutation.mutateAsync,
    forgotPassword: forgotPasswordMutation.mutateAsync
  };
};

// Export the login hook separately
export const useLogin = () => {
  const { login, isLoading } = useAuth();
  return { login, isLoading };
};

// Export the register hook separately
export const useRegister = () => {
  const { register, isLoading } = useAuth();
  return { register, isLoading };
};