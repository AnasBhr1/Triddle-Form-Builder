import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../utils/validation';
import { useRegister } from '../../hooks/useAuth';
import { Button, Input } from '../../components/ui';

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      navigate('/dashboard');
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: error.message || 'Registration failed. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <Input
                id="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Full Name"
                {...register('name')}
                error={errors.name?.message}
              />
            </div>
            <div className="mb-4">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>
            <div className="mb-4">
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Password"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>
            <div>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirm Password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
            </div>
          </div>

          {errors.root && (
            <div className="text-red-500 text-sm mt-2">{errors.root.message}</div>
          )}

          <div className="text-sm">
            <p className="text-gray-600">
              By registering, you agree to our{' '}
              <Link to="/terms" className="font-medium text-indigo-600 hover:text-indigo-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-medium text-indigo-600 hover:text-indigo-500">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;