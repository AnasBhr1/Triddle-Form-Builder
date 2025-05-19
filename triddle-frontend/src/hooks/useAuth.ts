import { useMutation } from '@tanstack/react-query';
import { AuthService, LoginCredentials, RegisterData } from '../services/auth';
import { useAuthStore } from '../store/auth';
import { toast } from '../store/toast';

// Define types for the API responses
interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
  token?: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface ForgotPasswordData {
  email: string;
}

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
    logout
  } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      setLoading(true);
      return AuthService.login(credentials);
    },
    onSuccess: (data: ApiResponse<AuthResponse>) => {
      setUser(data.data.user);
      setAuthenticated(true);
      setInitialized(true);
      setLoading(false);
      toast.success('Login successful', 'Welcome back!');
    },
    onError: (error) => {
      setLoading(false);
      toast.error('Login failed', error instanceof Error ? error.message : 'Please check your credentials and try again');
    }
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => {
      setLoading(true);
      return AuthService.register(data);
    },
    onSuccess: (data: ApiResponse<AuthResponse>) => {
      setUser(data.data.user);
      setAuthenticated(true);
      setInitialized(true);
      setLoading(false);
      toast.success('Registration successful', 'Your account has been created');
    },
    onError: (error) => {
      setLoading(false);
      toast.error('Registration failed', error instanceof Error ? error.message : 'Please check your information and try again');
    }
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      setLoading(true);
      return AuthService.logout();
    },
    onSuccess: () => {
      logout();
      toast.success('Logged out', 'You have been successfully logged out');
    },
    onError: (error) => {
      setLoading(false);
      toast.error('Logout failed', error instanceof Error ? error.message : 'An error occurred while logging out');
    }
  });

  const checkAuthMutation = useMutation({
    mutationFn: () => {
      setLoading(true);
      // Fix: Use getCurrentUser instead of checkAuth
      return AuthService.getCurrentUser();
    },
    onSuccess: (data: ApiResponse<AuthResponse>) => {
      setUser(data.data.user);
      setAuthenticated(true);
      setInitialized(true);
      setLoading(false);
      toast.success('Session restored', 'Welcome back!');
    },
    onError: () => {
      setLoading(false);
      setInitialized(true);
      toast.error('Session expired', 'Please log in again');
    }
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => {
      const data: ForgotPasswordData = { email };
      return AuthService.forgotPassword(data);
    },
    onSuccess: () => {
      toast.success('Email sent', 'Check your inbox for password reset instructions');
    },
    onError: (error) => {
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

// Add separate hook exports for login and register for backward compatibility
export const useLogin = () => {
  const { login, isLoading } = useAuth();
  return { login, isLoading };
};

export const useRegister = () => {
  const { register, isLoading } = useAuth();
  return { register, isLoading };
};