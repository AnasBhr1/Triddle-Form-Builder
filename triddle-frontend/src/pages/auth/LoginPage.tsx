import React from 'react';
import { useLogin } from '../../hooks/useAuth';
import { AuthService } from '../../services/auth';
import { Button, Input } from '../../components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/validation';

const LoginPage: React.FC = () => {
  const loginMutation = useLogin();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message as string}
        />
        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message as string}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={loginMutation.isPending}
        >
          Sign in
        </Button>
      </form>
      
      <div className="text-center">
        <a
          href="/register"
          className="text-sm text-primary-600 hover:text-primary-500"
        >
          Don't have an account? Sign up
        </a>
      </div>
      
      <div className="text-center">
        <a
          href="/forgot-password"
          className="text-sm text-gray-600 hover:text-gray-500"
        >
          Forgot your password?
        </a>
      </div>
    </div>
  );
};

export default LoginPage;