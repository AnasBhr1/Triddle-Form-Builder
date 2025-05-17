import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../utils/validation';
import { useRegister } from '../../hooks/useAuth';
import { Button, Input } from '../../components/ui';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await registerMutation.mutateAsync(data);
      // Redirect to dashboard on successful registration
      navigate('/dashboard');
    } catch (error) {
      // Error will be handled by the mutation's onError callback
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="John"
            {...register('firstName')}
            error={errors.firstName?.message as string}
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            {...register('lastName')}
            error={errors.lastName?.message as string}
          />
        </div>
        
        <Input
          label="Email Address"
          type="email"
          placeholder="john.doe@example.com"
          {...register('email')}
          error={errors.email?.message as string}
        />
        
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a secure password"
            {...register('password')}
            error={errors.password?.message as string}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <span>🙈</span> // Hide password icon
            ) : (
              <span>👁️</span> // Show password icon
            )}
          </button>
        </div>
        
        <Input
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message as string}
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={registerMutation.isPending}
          >
            Create Account
          </Button>
        </div>
      </form>
      
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Sign in
          </Link>
        </p>
      </div>
      
      <div className="text-xs text-center text-gray-500 dark:text-gray-400">
        By creating an account, you agree to our{' '}
        <a href="#" className="underline">Terms of Service</a> and{' '}
        <a href="#" className="underline">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default RegisterPage;