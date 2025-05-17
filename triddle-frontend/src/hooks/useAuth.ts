import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService, LoginCredentials, RegisterData } from '../services/auth';
import { useAuthStore } from '../store/auth';
import { toast } from '../store/toast';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setLoading,
    setError,
    clearError,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setLoading,
    setError,
    clearError,
  };
};

export const useLogin = () => {
  const { login } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials.email, credentials.password),
    onSuccess: () => {
      toast.success('Login successful', 'Welcome back!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: Error) => {
      toast.error('Login failed', error.message);
    },
  });
};

export const useRegister = () => {
  const { register } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: () => {
      toast.success('Registration successful', 'Welcome to Triddle!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: Error) => {
      toast.error('Registration failed', error.message);
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success('Logout successful', 'See you soon!');
      queryClient.clear();
    },
    onError: (error: Error) => {
      toast.error('Logout failed', error.message);
    },
  });
};

export const useGetMe = () => {
  const { getMe } = useAuthStore();

  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: getMe,
    enabled: false, // Only run when explicitly called
    retry: false,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: AuthService.forgotPassword,
    onSuccess: () => {
      toast.success('Reset link sent', 'Check your email for password reset instructions');
    },
    onError: (error: Error) => {
      toast.error('Failed to send reset link', error.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: AuthService.resetPassword,
    onSuccess: () => {
      toast.success('Password reset successful', 'You can now log in with your new password');
    },
    onError: (error: Error) => {
      toast.error('Password reset failed', error.message);
    },
  });
};